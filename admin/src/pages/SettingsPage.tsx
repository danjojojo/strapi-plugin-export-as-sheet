import { Main, Typography, Flex, Button, Loader } from '@strapi/design-system';
import { useEffect } from 'react';
import { DialogBox } from '../components/DialogBox';
import { useStateContext } from '../providers/StateProvider';
import { useSettings } from '../hooks/useSettings';
import { CheckboxList } from '../components/CheckboxList';

const SettingsPage = () => {
  const hook = useSettings();
  const { settings } = useStateContext();
  const { selectedExportableCollections, isFetched } = settings;

  useEffect(() => {
    hook.fetchStrapiCollections();
    hook.fetchSettings();
  }, []);

  return (
    <Main>
      <DialogBox />
      <Flex
        direction="column"
        width="100%"
        paddingLeft="56px"
        paddingRight="56px"
        paddingTop="40px"
        paddingBottom="40px"
        alignItems="start"
        gap="16px"
      >
        <Flex direction="column" alignItems="start">
          <Typography variant="alpha" fontSize="32px" marginBottom="4px">
            Export as Sheet Settings
          </Typography>
          <Typography variant="omega" textColor="#A5A5BA">
            Select collections to be available for export
          </Typography>
        </Flex>
        <Flex gap="12px" direction="column" alignItems="start">
          {!isFetched ? <Loader small /> : <CheckboxList hook={hook} />}
        </Flex>
        <Button
          size="L"
          marginTop="14px"
          onClick={hook.updateSettings}
          disabled={selectedExportableCollections.length === 0}
        >
          Save Settings
        </Button>
      </Flex>
    </Main>
  );
};

export { SettingsPage };
