import React, { useState, useCallback } from 'react';
import {
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Input,
} from '@chakra-ui/react';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  unitPosition?: 'prefix' | 'suffix';
}

const SliderInput = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit = '',
  unitPosition = 'suffix',
}: SliderInputProps) => {
  const [inputValue, setInputValue] = useState(String(value));

  const formatValue = useCallback(
    (val: number) => (unitPosition === 'prefix' ? `${unit}${val}` : `${val}${unit}`),
    [unit, unitPosition],
  );

  const handleSliderChange = useCallback(
    (newValue: number) => {
      onChange(newValue);
      setInputValue(String(newValue));
    },
    [onChange],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newInputValue = e.target.value;
      const numericRegex = /^-?\d*(\.\d{0,2})?$/;

      if (numericRegex.test(newInputValue) || newInputValue === '' || newInputValue === '-') {
        setInputValue(newInputValue);
        if (newInputValue !== '' && newInputValue !== '-') {
          const parsedValue = parseFloat(newInputValue);
          if (!isNaN(parsedValue)) {
            onChange(Math.min(max, parsedValue));
          }
        } else if (newInputValue === '') {
          onChange(0);
        }
      }
    },
    [max, onChange],
  );

  const handleInputBlur = useCallback(() => {
    const newValue = parseFloat(inputValue);
    if (isNaN(newValue)) {
      setInputValue(String(min));
      onChange(min);
    } else {
      setInputValue(String(Math.max(min, Math.min(max, newValue))));
      onChange(Math.max(min, Math.min(max, newValue)));
    }
  }, [inputValue, min, max, onChange]);

  return (
    <Box p={4} bg="white">
      <Flex direction="column" gap={3}>
        <Flex justify="space-between" align="center">
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            {label}
          </Text>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            size="sm"
            w="80px"
            textAlign="right"
            placeholder={min.toString()}
            variant="outline"
          />
        </Flex>

        <Box>
          <Slider
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={handleSliderChange}
            focusThumbOnChange={false}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>

          <Flex justify="space-between" mt={1} fontSize="xs" color="gray.500">
            <Text>{formatValue(min)}</Text>
            <Text>{formatValue(max)}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default SliderInput;