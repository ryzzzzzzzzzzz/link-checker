import React from 'react'

export default function ResultTable(props) {
    return (
        <div>
            <div>
                <span>2xx: {props.rowCodeResult.green}; </span>
                <span>3xx: {props.rowCodeResult.yellow}; </span>
                <span>4xx: {props.rowCodeResult.orange}; </span>
                <span>5xx: {props.rowCodeResult.red}; </span>
                <span>other: {props.rowCodeResult.other}</span>
            </div>
            <table>
                <thead>
                <tr>
                    <th>URL</th>
                    <th>CODE</th>
                    <th>TITLE</th>
                    <th>DESCRIPTION</th>
                    <th>H1</th>
                </tr>
                </thead>
                <tbody>
                {props.table.length > 0 ? (
                    props.table.map((row, index) => (
                        <tr key={index}>
                            <td>{row.url}</td>
                            <td className={props.rowCode[index]}>{row.code}</td>
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
            </table>
        </div>
    )
}