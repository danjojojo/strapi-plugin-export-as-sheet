import { Flex, DatePicker, Typography } from '@strapi/design-system';
import { convertDateToLocal } from '../utils/utils';

interface SelectDateProps {
  label: string;
  date: Date | null;
  setDate: (date: Date | null) => void;
  minDate?: Date | undefined;
  maxDate?: Date | null;
  value?: Date | null;
  disabled?: boolean;
  type: 'start' | 'end';
}

export function SelectDate({
  label = 'label',
  setDate = () => {},
  minDate = undefined,
  maxDate = new Date(),
  value = null,
  disabled = false,
  type,
}: SelectDateProps) {
  return (
    <Flex direction="column" alignItems="start" gap="4px">
      <Typography textColor="#A5A5BA" fontSize="10px">
        {label.toUpperCase()}
      </Typography>
      <DatePicker
        size="L"
        onChange={(date: Date | null) => {
          switch (type) {
            case 'start':
              date?.setHours(0, 0, 0, 0);
              break;
            case 'end':
              date?.setHours(23, 59, 59, 999);
              break;
          }
          setDate(convertDateToLocal(date));
        }}
        minDate={minDate}
        maxDate={maxDate}
        value={value}
        disabled={disabled}
      />
    </Flex>
  );
}
