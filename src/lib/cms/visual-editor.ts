export const isVisualEditor = (token: unknown) =>
  !!token && token === process.env.VISUAL_EDITING_SECRET;
