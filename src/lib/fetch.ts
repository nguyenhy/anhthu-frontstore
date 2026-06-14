import { AppError } from "./error";

export const BFF_API_ENDPOINT = process.env.BFF_API_ENDPOINT ?? "";
export const BFF_API_TOKEN = process.env.BFF_API_TOKEN ?? "";

export const fetchFromBff = (input: string, init: RequestInit = {}) => {
  if (!BFF_API_ENDPOINT) {
    throw new AppError("api not configured");
  }

  const url = new URL(input, BFF_API_ENDPOINT);

  return fetch(url, {
    next: { revalidate: 60, ...init.next },
    ...init,
    headers: {
      ...(BFF_API_TOKEN ? { Authorization: `Bearer ${BFF_API_TOKEN}` } : {}),
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
};
