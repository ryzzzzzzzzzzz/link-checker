import React from 'react'

const HistoryTable = (props) => (
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
        {props.historyTable.length > 0 ? (
            props.historyTable.map((row, index) => (
                <tr key={index}>
                    <td>{row.url}</td>
                    <td className={props.rowCode[index + 1]}>{row.code}</td>
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
)

export default HistoryTable