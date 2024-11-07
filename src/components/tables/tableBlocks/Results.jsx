import s from "./../Table.module.css"

export function Results(props) {
    return (
        <div className={s.results}>
            <span className={s.greenLine}> 2xx: {props.codeResults.green}</span>
            <span className={s.yellowLine}> 3xx: {props.codeResults.yellow}</span>
            <span className={s.orangeLine}> 4xx: {props.codeResults.orange}</span>
            <span className={s.redLine}> 5xx: {props.codeResults.red}</span>
            <span className={s.otherLine}> other: {props.codeResults.other}</span>
        </div>
    )
}