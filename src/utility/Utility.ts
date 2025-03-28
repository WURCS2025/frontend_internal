export const convertTimeFormat = (date: string): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Use 24-hour format; remove or set to true for 12-hour format
  })
};

export const capitalizeFirstLetterSafe = (word: string | null): string => {
  if (!word) return "";
  return word.trim().charAt(0).toUpperCase() + word.trim().slice(1);
}


export const toBoolean = (value: string | null | undefined): boolean => {
  return value?.toLowerCase() === "true";
};