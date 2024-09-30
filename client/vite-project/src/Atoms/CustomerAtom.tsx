import {atom} from "jotai";
import {Customer} from "../Api.ts";


export const customerAtom = atom<Customer[]>([]);