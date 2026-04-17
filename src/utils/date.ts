export const formatTime = (dateTime: string | null): string => {
  if (!dateTime) return "--";
  const date = new Date(dateTime);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatMonthYear = (year: number, month: number): string => {
  return new Date(year, month - 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
};