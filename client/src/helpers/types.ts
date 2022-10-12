import { MouseEventHandler, ReactNode } from "react";


export type MyButtonProps = {
  onClick: MouseEventHandler,
  text: string,
  variant: string
}

export type SortWrapper = {
  children: ReactNode,
  by: string
}

export type DeleteEvent = {
    uid: string
}



export type SearchState = {
    text: string
}

export type Owner = {
    uid: string,
    name: string,
    role: string
}
