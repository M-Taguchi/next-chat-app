export const MESSAGE_TYPE = {
  SYSTEM: "0",
  ME: "1",
  OTHER: "2",
} as const;
export type MESSAGE_TYPE = typeof MESSAGE_TYPE[keyof typeof MESSAGE_TYPE];
