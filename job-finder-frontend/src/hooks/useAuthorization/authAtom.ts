import { atom } from "jotai";

export const authStatusAtom = atom<"AUTHORIZED" | "UNAUTHORIZED">(
  "UNAUTHORIZED"
);
