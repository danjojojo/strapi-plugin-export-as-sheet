import { Flex, DatePicker, Typography } from '@strapi/design-system';
import { convertDateToLocal } from '../utils/utils';

interface SelectDateProps {
  label: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
  value?: Date | undefined;
  disabled?: boolean;
  type: 'start' | 'end';
}

export function SelectDate({
  label = 'label',
  setDate = () => {},
  minDate = undefined,
  maxDate = new Date(),
  value = undefined,
  disabled = false,
  type,
}: SelectDateProps) {
  return (
    <Flex direction="column" alignItems="start" gap="4px">
      <Typography textColor="#A5A5BA" fontSize="10px">
        {label.toUpperCase()}
      </Typography>
      <DatePicker
        size="M"
        onChange={(date: Date | undefined) => {
          if (!date) return;
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
