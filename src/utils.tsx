export const stringifyUnixTimestamp = (datetime: string): string => {
  if (datetime === undefined) { return datetime; }
  try {
    return new Date(datetime).toLocaleString();
  } catch (error) {
    console.error(`Failed to parse datetime str ${datetime}`, error); // tslint:disable-line:no-console
    return datetime;
  }
};