import React from 'react'
// import { buttonStyles } from './Button.styles'
import Button from 'react-bootstrap/Button';
import { MyButtonProps } from '../helpers/types';



const MyButton = ({ onClick, variant, text }: MyButtonProps) => (
    <Button variant={variant} onClick={onClick}>{text}</Button>

)

export default MyButton