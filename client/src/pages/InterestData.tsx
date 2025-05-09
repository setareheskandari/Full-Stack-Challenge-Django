import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { Box, Flex } from '@chakra-ui/react';
import { fetchProjections, InterestParams } from '../api/interest';
import { InterestForm, SliderConfig } from '../components/forms/InterestForm';
import LineChart from '../components/LineChart';
import ProjectionsSummary from '../components/ProjectionsSummary';

interface FormValues {
    initial: number;
    deposit_amount: number;
    interest_rate: number;
  }

const sliderConfigs = [
  { id: 'initial', label: 'Initial Amount', min: 0, max: 100_000, step: 1_000, unit: '£', unitPosition: 'prefix' },
  { id: 'deposit_amount', label: 'Monthly Deposit', min: 0, max: 10_000, step: 100, unit: '£', unitPosition: 'prefix' },
  { id: 'interest_rate', label: 'Interest Rate', min: 0, max: 20, step: 0.1, unit: '%'}
] as SliderConfig<FormValues>[];

const InterestData: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    initial: 0,
    deposit_amount: 0,
    interest_rate: 0,
  });

  const [debouncedValues] = useDebounce(formValues, 300);
  const [data, setData] = useState<{ x: string; y: number }[]>([]);

  useEffect(() => {

    const params: InterestParams = {
      initial: debouncedValues.initial,
      deposit_amount: debouncedValues.deposit_amount,
      interest_rate: debouncedValues.interest_rate,
    };

    fetchProjections(params)
      .then(({ xAxis, yAxis }) => {
        setData(xAxis.map((x, i) => ({ x: x.toString(), y: yAxis[i] })));
      })
  }, [debouncedValues]);

  const handleFormChange = (field: keyof FormValues, value: number) =>
    setFormValues((prev) => ({ ...prev, [field]: value }));

  return (
    <Flex pt={40} gap={20} >
    <Box width="400px">
        <InterestForm<FormValues>
          values={formValues}
          onChange={handleFormChange}
          configs={sliderConfigs} // Pass the configuration array
        />
    </Box>
    <Box flex={1} minW={{ base: '100%', md: '675px' }}>
        <Box
          p={4}
          bg="white"
        >
            <LineChart
              xAxisData={data.map((pt) => pt.x)}
              yAxisData={data.map((pt) => pt.y.toString())}
              title='Savings Over Time'
              xLabel="year(s)"
              yLabel={`amount (${sliderConfigs.find(config => config.id === 'initial')?.unit})`}
            />
        </Box>
        <Box
            mt={4}
            p={4}
            textAlign="center"
        >
            <ProjectionsSummary
                years={
                data.length > 0
                ? parseInt(data[data.length - 1].x, 10)
                : 0
            }
            amount={
                data.length > 0
                ? parseFloat(data[data.length - 1].y.toString())
                : 0
            }
            unit={sliderConfigs.find(c => c.id === 'initial')?.unit || '' }
            />
        </Box>
      </Box>
    </Flex>
  )
}

export default InterestData
