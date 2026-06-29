export interface Logger {
  uid: number;
  info: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}
export const createLogger = (_uid?: number): Logger => {
  const uid = _uid || Math.floor(Math.random() * 10000000) + Date.now();

  const infoLogger = (...args: unknown[]) => {
    console.log(
      //
      "[INF]",
      new Date().toISOString(),
      uid,
      ...args,
    );
  };

  const errorLogger = (...args: unknown[]) => {
    console.error(
      //
      "[ERR]",
      new Date().toISOString(),
      uid,
      ...args,
    );
  };

  return {
    uid,
    info: infoLogger,
    error: errorLogger,
  };
};
