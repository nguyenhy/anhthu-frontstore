import { fetchFromBff } from "../fetch";

export const getImagePresignedUrl = async (filepath: string) => {
  const response = await fetchFromBff(`/frontstore/asset?file=${filepath}`);
  const json = await response.json();
  return json.url;
};
