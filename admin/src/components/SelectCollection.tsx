import { SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { Flex, Button, Typography } from '@strapi/design-system';
import { useStateContext } from './provider/StateProvider';
import { SelectDate } from './SelectDate';
import { useHomepage } from '../hooks/useHomepage';

export function SelectCollection() {
  const { homepage, fetchParams } = useStateContext();
  const { endDate, startDate, maxEndDate, disableFetch } = fetchParams;
  const { fetchCollectionEntries, updateDate, selectCollection } = useHomepage();

  return (
    <Flex direction="row" alignItems="start" gap="16px">
      <Flex direction="column" alignItems="start" gap="4px">
        <Typography textColor="#A5A5BA" fontSize="10px">
          COLLECTION
        </Typography>
        <SingleSelect
          placeholder="Select a collection"
          value={homepage.selectedCollection}
          onChange={selectCollection}
        >
          {homepage.collections.map((item) => (
            <SingleSelectOption key={item.uid} value={item.uid}>
              {item.name}
            </SingleSelectOption>
          ))}
        </SingleSelect>
      </Flex>
      <SelectDate
        label="FROM"
        date={startDate}
        setDate={updateDate.start}
        maxDate={new Date()}
        value={startDate}
        type="start"
      />
      <SelectDate
        label="TO"
        date={endDate}
        setDate={updateDate.end}
        minDate={startDate || undefined}
        maxDate={maxEndDate}
        value={endDate}
        disabled={!startDate}
        type="end"
      />
      <Button
        variant="default"
        size="L"
        disabled={disableFetch}
        onClick={fetchCollectionEntries}
        marginTop="18px"
      >
        Fetch Entries
      </Button>
    </Flex>
  );
}
