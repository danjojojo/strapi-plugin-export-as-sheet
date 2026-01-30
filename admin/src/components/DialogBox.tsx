import { Dialog, Flex, Typography, Button } from '@strapi/design-system';
import { useStateContext } from '../providers/StateProvider';

export function DialogBox() {
  const { dialog } = useStateContext();
  return (
    <Dialog.Root open={dialog.isOpen}>
      <Dialog.Content>
        <Dialog.Header>Notice</Dialog.Header>
        <Dialog.Body>
          <Flex justifyContent="center" alignItems="center">
            <Typography>{dialog.message}</Typography>
          </Flex>
        </Dialog.Body>
        <Dialog.Footer>
          <Button fullWidth variant="tertiary" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
