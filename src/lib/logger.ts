export const createLogger = (_uid?: number) => {
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
    info: infoLogger,
    error: errorLogger,
  };
};
