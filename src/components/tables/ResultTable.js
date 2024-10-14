import React from 'react'

export default function ResultTable(props) {
    return (
        <div>
            <div className='result-container'>
                <span id='result-2xx'>2xx: {props.rowCodeResult.green}; </span>
                <span className='result-3xx'>3xx: {props.rowCodeResult.yellow}; </span>
                <span className='result-4xx'>4xx: {props.rowCodeResult.orange}; </span>
                <span className='result-5xx'>5xx: {props.rowCodeResult.red}; </span>
                <span className='result-other'>other: {props.rowCodeResult.other}</span>
            </div>
            <div className='table-container'>
                <table id='table' cellPadding='2' cellSpacing='5'>
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
        </div>
    )
}