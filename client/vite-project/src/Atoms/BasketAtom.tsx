import { atom } from "jotai";

export const basketAtom = atom<{ paperId: number; quantity: number; feature?: string, price: number }[]>([]);
