import { Main, Box, Typography, Flex } from '@strapi/design-system';
import { SelectCollection } from '../components/SelectCollection';
import { DialogBox } from '../components/DialogBox';
import { Header } from '../components/Header';
import { RenderTable } from '../components/RenderTable';
import { useHomepage } from '../hooks/useHomepage';
import { useEffect } from 'react';

const HomePage = () => {
  const { fetchExportableCollections } = useHomepage();
  
  useEffect(() => {
    fetchExportableCollections();
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
          <Typography variant="alpha" fontSize="32px">
            Export as Sheet
          </Typography>
          <Typography variant="omega" textColor="#A5A5BA">
            Export collection as an Excel Spreadsheet
          </Typography>
        </Flex>
        <SelectCollection />
        <Box width="100%" marginTop="40px">
          <Header />
          <RenderTable />
        </Box>
      </Flex>
    </Main>
  );
};

export { HomePage };
