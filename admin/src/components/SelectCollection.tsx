import { SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { Flex, Button, Typography } from '@strapi/design-system';
import { useStateContext } from '../providers/StateProvider';
import { SelectDate } from './SelectDate';
import { useHomepage } from '../hooks/useHomepage';
import { useEffect } from 'react';

export function SelectCollection() {
  const { homepage, fetchParams, fetchParamsUpdate } = useStateContext();
  const { endDate, startDate, maxEndDate, disableFetch } = fetchParams;
  const { fetchInit, updateDate, selectCollection } =
    useHomepage();

  useEffect(() => {
    if (homepage.selectedCollection && (fetchParams.startDate || fetchParams.endDate)) {
      fetchParamsUpdate({ type: 'SET_DISABLE_FETCH', payload: false });
      fetchParamsUpdate({ type: 'SET_OFFSET', payload: 0 });
    }
  }, [homepage.selectedCollection, fetchParams.startDate, fetchParams.endDate]);

  useEffect(() => {
    if (fetchParams.startDate) {
      let endMaxDate = new Date(fetchParams.startDate);
      endMaxDate.setDate(endMaxDate.getDate() + 30);
      if (endMaxDate >= new Date()) {
        endMaxDate = new Date();
      }
      endMaxDate.setHours(23, 59, 59, 999);
      updateDate.maxEnd(endMaxDate);
      updateDate.end(endMaxDate);
    }
  }, [fetchParams.startDate]);

  return (
    <Flex direction="row" alignItems="center" gap="16px">
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
        disabled={disableFetch}
        onClick={fetchInit}
        marginTop="18px"
        height="38px"
      >
        Fetch Entries
      </Button>
    </Flex>
  );
}
