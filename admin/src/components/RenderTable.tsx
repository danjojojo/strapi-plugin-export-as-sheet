import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import { Typography, Link, Button } from '@strapi/design-system';
import { useStateContext } from '../providers/StateProvider';
import { useHomepage } from '../hooks/useHomepage';

export function RenderTable() {
  const { homepage, fetchParams, fetchParamsUpdate } = useStateContext();
  const { entries, attributes } = homepage;
  const { fetchCollectionEntries } = useHomepage();

  const loadMore = async () => {
    fetchParamsUpdate({ type: 'SET_OFFSET', payload: fetchParams.offset + fetchParams.limit });
    await fetchCollectionEntries();
  }
  return (
    <div>
      <Table colCount={attributes.length} rowCount={entries.length}>
        <Thead>
          <Tr>
            {attributes.map((attribute, index) => (
              <Th key={index}>
                <Typography variant="sigma">{attribute.label}</Typography>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {entries.length === 0 && attributes.length > 0 ? (
            <Tr>
              {attributes.map((_, index) => (
                <Td key={index}>
                  <Typography textColor="neutral800">-</Typography>
                </Td>
              ))}
            </Tr>
          ) : (
            entries.map((entry, index) => (
              <Tr key={index}>
                {Object.entries(entry).map(([key, value]) => {
                  const stringValue = String(value);

                  if (stringValue.startsWith('http://') || stringValue.startsWith('https://')) {
                    return (
                      <Td key={key}>
                        <Link href={stringValue} isExternal>
                          View Media
                        </Link>
                      </Td>
                    );
                  }

                  return (
                    <Td key={key}>
                      <Typography textColor="neutral800">{stringValue ?? '-'}</Typography>
                    </Td>
                  );
                })}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {homepage.entriesTotalCount > entries.length && (
        <Button width="100%" height="38px" variant="secondary" marginTop="4px" onClick={loadMore}>
          Load More
        </Button>
      )}
    </div>
  );
}
