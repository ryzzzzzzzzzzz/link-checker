import s from "./Button.module.css"

export default function Button(props){
    return (
        <button onClick={props.onClick} className={s.button}>{props.children}</button>
    )
}