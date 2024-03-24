import { Dispatch, SetStateAction } from "react"
import { ElementStates } from "./element-states";

export type TFormState = {[key:string]: string};
export type TSetActive = Dispatch<SetStateAction<boolean>>;
export type TSetFormState = Dispatch<SetStateAction<{[key:string]: string}>>;
export type AnimationFrame = [number, ElementStates][];