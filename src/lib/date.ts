export function formatDateUtc(dateInput: string | Date) {
  const value = new Date(dateInput);
  if (Number.isNaN(value.getTime())) return String(dateInput);

  const day = String(value.getUTCDate()).padStart(2, "0");
  const month = String(value.getUTCMonth() + 1).padStart(2, "0");
  const year = String(value.getUTCFullYear());
  return `${day}/${month}/${year}`;
}
