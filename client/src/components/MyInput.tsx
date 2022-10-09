import React, { MouseEventHandler } from 'react'
// import { buttonStyles } from './Button.styles'
import Input from 'react-bootstrap/Button';


type Props = {
    onClick: MouseEventHandler,
    text: string,
    variant: string
}

const MyButton = ({ onClick, variant, text }: Props) => (
    <Button variant={variant} onClick={onClick}>{text}</Button>

)

export default MyButton