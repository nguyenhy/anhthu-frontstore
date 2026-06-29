import { AppError } from "./error";
import { createLogger, Logger } from "./logger";

export const BFF_API_ENDPOINT = process.env.BFF_API_ENDPOINT ?? "";
export const BFF_API_TOKEN = process.env.BFF_API_TOKEN ?? "";

export const fetchFromBff = async (
  input: string,
  init: RequestInit = {},
  options?: {
    logger?: Logger;
  },
) => {
  if (!BFF_API_ENDPOINT) {
    throw new AppError("api not configured");
  }

  const logger = options?.logger || createLogger();
  const uid = logger.uid;
  const url = parseBffEndpoint(input);
  url.searchParams.set("rid", uid.toString());

  logger.info(
    "[api] >>",
    init.method || "GET",
    decodeURIComponent(url.toString()),
  );

  const cacheControl =
    !!init.headers && "Cache-Control" in init.headers
      ? init.headers["Cache-Control"]
      : "no-store";

  const result = await fetch(url, {
    next: { revalidate: 60, ...init.next },
    ...init,
    headers: {
      ...(BFF_API_TOKEN ? { Authorization: `Bearer ${BFF_API_TOKEN}` } : {}),
      "Content-Type": "application/json",
      "Cache-Control": cacheControl,
      ...init.headers,
    },
  });

  logger.info("[api] <<", result.status, Array.from(result.headers.entries()));

  return result;
};

export const parseBffEndpoint = (path: string) => {
  if (!BFF_API_ENDPOINT) {
    throw new AppError("api not configured");
  }

  return new URL(path, BFF_API_ENDPOINT);
};
