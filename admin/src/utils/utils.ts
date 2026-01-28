export function convertDateToLocal(date: Date | null): Date | null {
  if (!date) return null;
  const localDate = new Date(date);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  return localDate;
}
