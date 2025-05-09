import { Flex } from '@chakra-ui/react';
import SliderInput from './SliderInput';

export interface SliderConfig<T> {
  id: keyof T;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  unitPosition?: 'prefix' | 'suffix';
}

export interface InterestFormProps<T extends { [K in keyof T]: number }>  {
  values: T;
  onChange: (field: keyof T, value: number) => void;
  configs: SliderConfig<T>[];
}

export function InterestForm<T extends { [K in keyof T]: number }>({
  values,
  onChange,
  configs,
}: InterestFormProps<T>) {
  return (
    <Flex direction="column" gap={4} width="100%">
      {configs.map(({ id, label, unit, min, max, step, unitPosition }) => (
        <SliderInput
          key={String(id)}
          label={label}
          unit={unit}
          value={values[id]}
          onChange={(v) => onChange(id, v)}
          min={min}
          max={max}
          step={step}
          unitPosition={unitPosition}
        />
      ))}
    </Flex>
  );
}
