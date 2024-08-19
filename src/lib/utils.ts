export const formatDate = (dateStr: string | undefined | null) => {
  if (!dateStr) {
    return "Invalid date";
  }
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return formatter.format(date);
};
