export function convertDateToLocal(date: Date | undefined): Date | undefined {
  if (!date) return undefined;
  const localDate = new Date(date);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  return localDate;
}
