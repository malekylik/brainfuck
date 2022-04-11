import React from 'react';

type NumberInputProps = {
  id?: string;
  min?: number;
  defaultValue: number;
  onChange?: (value: number) => void;
};

export function NumberInput(props: NumberInputProps) {
  const {
    id,
    min,
    defaultValue,
    onChange,
  } = props;

  const [value, setValue] = React.useState(String(defaultValue));

  return (
    <input
      id={id}
      type='number'
      min={min}
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;

        setValue(newValue);
      }}
      onBlur={() => {
        const newValue = Number(value) || 0;

        setValue(String(newValue));
        onChange?.(newValue);
      }}
    />
  );
}
