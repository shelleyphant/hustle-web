import React from 'react'
import './styles/styles-ui.scss'

export default function TextInput(props) {
    return (
        <input 
            type={props.type ? props.type : 'text'}
            placeholder={props.placeholder ? props.placeholder : "placeholder"}
            name={props.name}
            id={props.id}
            onChange={props.onChange ? props.onChange : ""}
            value={props.value}
        ></input>
    )
}
