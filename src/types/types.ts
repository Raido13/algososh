import { Dispatch, SetStateAction } from "react"

export type TFormState = {[key:string]: string};
export type TSetActive = Dispatch<SetStateAction<boolean>>;
export type TSetFormState = Dispatch<SetStateAction<{[key:string]: string}>>;