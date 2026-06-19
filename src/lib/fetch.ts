import { AppError } from "./error";

export const BFF_API_ENDPOINT = process.env.BFF_API_ENDPOINT ?? "";
export const BFF_API_TOKEN = process.env.BFF_API_TOKEN ?? "";

export const fetchFromBff = async (input: string, init: RequestInit = {}) => {
  if (!BFF_API_ENDPOINT) {
    throw new AppError("api not configured");
  }

  const uid = Math.floor(Math.random() * 10000000) + Date.now();
  const url = parseBffEndpoint(input);

  console.log(
    new Date().toISOString(),
    uid,
    "[api] >>",
    init.method || "GET",
    decodeURIComponent(url.toString()),
  );

  const result = await fetch(url, {
    next: { revalidate: 60, ...init.next },
    ...init,
    headers: {
      ...(BFF_API_TOKEN ? { Authorization: `Bearer ${BFF_API_TOKEN}` } : {}),
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  console.log(new Date().toISOString(), uid, "[api] <<", result.status);

  return result;
};

export const parseBffEndpoint = (path: string) => {
  if (!BFF_API_ENDPOINT) {
    throw new AppError("api not configured");
  }

  return new URL(path, BFF_API_ENDPOINT);
};
