import { Checkbox, Typography } from '@strapi/design-system';
import { useStateContext } from '../providers/StateProvider';
import { UseSettingsReturnType } from '../hooks/useSettings';

interface CheckboxList {
  hook: UseSettingsReturnType;
}

export function CheckboxList({ hook }: CheckboxList) {
  const { settings } = useStateContext();

  return settings.strapiCollections.map((collection) => (
    <Checkbox
      key={collection.uid}
      value={collection.uid}
      defaultChecked={hook.isCollectionExportable(collection.uid)}
      onCheckedChange={(value: boolean) =>
        hook.addToSelectedCollections({ ...collection, added: value })
      }
    >
      <Typography fontSize="16px">{collection.name}</Typography>
    </Checkbox>
  ));
}
