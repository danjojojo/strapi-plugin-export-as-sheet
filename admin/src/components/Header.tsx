import { Flex, Button, Typography } from '@strapi/design-system';
import { useStateContext } from './provider/StateProvider';
import { useHomepage } from '../hooks/useHomepage';

export function Header() {
  const { homepage } = useStateContext();
  const { exportAsSheet } = useHomepage();

  return (
    <Flex justifyContent="space-between" alignItems="center" width="100%" marginBottom="16px">
      <Typography textColor="neutral800" fontSize="28px">
        Preview
      </Typography>
      <Flex alignItems="center" gap="16px">
        <Typography textColor="neutral800">
          {homepage.entries.length} {homepage.entries.length === 1 ? 'entry' : 'entries'} found
        </Typography>
        <Button
          variant="primary"
          disabled={homepage.entries.length === 0}
          size="L"
          onClick={exportAsSheet}
        >
          Export as Sheet
        </Button>
      </Flex>
    </Flex>
  );
}
