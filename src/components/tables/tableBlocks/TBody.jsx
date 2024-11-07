import {colorTable} from "../../../utils/index";

export function TBody(props) {
    return (
        <tbody>
        {props.table.length > 0 ? (
            props.table.map((row, index) => (
                <tr key={index}>
                    <td>{row.url}</td>
                    <td className={colorTable(row.code)}>{row.code}</td>
                    <td>{row.title}</td>
                    <td>{row.description}</td>
                    <td>{row.h1}</td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={3}>No links</td>
            </tr>
        )}
        </tbody>

    )
}