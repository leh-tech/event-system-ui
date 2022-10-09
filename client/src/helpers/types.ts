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

