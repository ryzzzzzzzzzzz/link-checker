export function Results(props) {
    return (
        <div>
            <span> 2xx: {props.codeResults.green}, </span>
            <span> 3xx: {props.codeResults.yellow}, </span>
            <span> 4xx: {props.codeResults.orange}, </span>
            <span> 5xx: {props.codeResults.red}, </span>
            <span> other: {props.codeResults.other} </span>
        </div>
    )
}