export type ErrorType = { toString?: () => string };
export const getMessage = (error?: ErrorType) => {
  return (error && error.toString && error.toString()) || 'download failed';
};
