import {useContext, useEffect, useState} from "react";
import {Context} from "../../contexts";
import { getToken, getTable } from "../../api/index";
import { colorTable, countingResults, ExportTableToCSV } from './../../utils/index'

export default function Table () {
    const { links } = useContext(Context)
    const [table, setTable] = useState([])
    const [codeResults, setCodeResults] = useState({green: 0, yellow: 0, orange: 0, red: 0, other: 0})
    const [isDownload, setIsDownload] = useState(false);

    useEffect(() => {
        if(links.length > 0){
            getToken(links)
                .then((token) => {
                    return getTable(token, links.at(-1).urls.length, createTable)
                    }
                )
        }
    }, [links]);

    useEffect(() => {
        if(links.length > 0){
            countingResults(table, codeResults, setCodeResults)
        }
    }, [table]);

    const createTable = (table) => {
        setTable(table.body)
    }

    const setDownload = () => {
        setIsDownload(true)
        setTimeout(() => setIsDownload(false), 1000)
    }

    return (
        <section>
            <button onClick={setDownload}>Copy as CSV</button>
            {isDownload ? <ExportTableToCSV table={table}/> : null}
            <div>
                <span> 2xx: {codeResults.green}, </span>
                <span> 3xx: {codeResults.yellow}, </span>
                <span> 4xx: {codeResults.orange}, </span>
                <span> 5xx: {codeResults.red}, </span>
                <span> other: {codeResults.other} </span>
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
                {table.length > 0 ? (
                    table.map((row, index) => (
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
            </table>
        </section>
    )
}