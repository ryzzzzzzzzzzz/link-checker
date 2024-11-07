import {useContext, useEffect, useState} from "react";
import {CSVLink} from "react-csv";
import {Context} from "../../contexts";
import {getToken, getTable} from "../../api/index";
import { countingResults } from './../../utils/index'
import Button from "../button/Button";
import {Results, THead, TBody} from "../tables/tableBlocks/index"
import s from "./Table.module.css"

export default function Table () {
    const { links } = useContext(Context)
    const [table, setTable] = useState([])
    const [token, setToken] = useState('')
    const [codeResults, setCodeResults] = useState({green: 0, yellow: 0, orange: 0, red: 0, other: 0})

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
            countingResults(table, setCodeResults)
        }
    }, [table]);

    const createTable = (table) => {
        setTable(table.body)
        setToken(table.token)
    }

    return (
        <>
            <section className={s.tableC}>
                <CSVLink filename={'table-' + token + '.csv'} data={table} target='_blank' className={s.csvLink}><Button>Download CSV</Button></CSVLink>
                <Results codeResults={codeResults}/>
            </section>
                <table className={s.table}>
                    <THead/>
                    <TBody table={table}/>
                </table>
        </>
    )
}