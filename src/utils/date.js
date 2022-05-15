export const convertUTCToDateTime = (utc) =>
  `${new Date(utc * 1000).toLocaleDateString("en-US")} ${new Date(
    utc * 1000
  ).toLocaleTimeString("en-US")}`;
