import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import { Typography, Link } from '@strapi/design-system';
import { useStateContext } from '../providers/StateProvider';

export function RenderTable() {
  const { homepage } = useStateContext();
  const { entries, attributes } = homepage;
  return (
    <Table>
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
  );
}
