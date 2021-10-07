import React from 'react'
import './styles/styles-ui.scss'

export default function Button(props) {
    return (
        <button
            name={props.name}
            type={props.type ? props.type : 'button'}
            className={props.display ? props.display : 'alt'}
        >{props.text}</button>
    )
}
