import React from 'react'

const HistoryTable = () => (
    <table>
        <thead>
        <tr>
            <th>URL</th>
            <th>CODE</th>
            <th>TITLE</th>
            <th>
                <button className="button muted-button">Choose all</button>
                <button className="button muted-button">Recheck</button>
                <button className="button muted-button">Delete</button>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>link</td>
            <td>code</td>
            <td>title</td>
            <td><input type="checkbox"/>Recheck</td>
            <td><input type="checkbox"/>Delete</td>
        </tr>
        </tbody>
    </table>
)

export default HistoryTable