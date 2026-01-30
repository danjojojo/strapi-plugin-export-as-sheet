import { Flex, Button, Typography } from '@strapi/design-system';
import { useStateContext } from '../providers/StateProvider';
import { useHomepage } from '../hooks/useHomepage';

export function Header() {
  const { homepage, fetchParams } = useStateContext();
  const { exportAsSheet } = useHomepage();

  return (
    <Flex justifyContent="space-between" alignItems="center" width="100%" marginBottom="16px">
      <Typography textColor="neutral800" fontSize="28px">
        Preview
      </Typography>
      <Flex alignItems="center" gap="16px">
        <Typography textColor="neutral800">
          {homepage.entries.length} {homepage.entries.length === 1 ? 'entry' : 'entries'} to export ({homepage.entriesTotalCount} total)
        </Typography>
        <Button
          variant="default"
          disabled={homepage.entries.length === 0 || fetchParams.disableExport}
          height="38px"
          onClick={exportAsSheet}
        >
          Export as Sheet
        </Button>
      </Flex>
    </Flex>
  );
}
