import { atom } from "jotai";

export const basketAtom = atom<{ paperId: number; featureId: number; name: string; quantity: number; feature?: string, price: number }[]>([]);
