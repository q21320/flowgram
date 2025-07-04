export const getUrlData = (param: string) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
};