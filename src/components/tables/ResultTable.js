import React, {useState, useEffect} from 'react'

export default function ResultTable(props) {
    const [rowCodeResult, setRowCodeResult] = useState({
        green: 0,
        yellow: 0,
        orange: 0,
        red: 0,
        other: 0
    })
    const [rowCode, setRowCode] = useState([])
    const [loading, setLoading] = useState(false)
    const reRender = props.table.length > 0 && props.table[props.index].length <= props.userLinks[props.index - 1].urls.length

    useEffect((props) => {
        (async () => {
            if(reRender) {
                setRowCodeResult(prevRowCodeResult => ({
                    ...prevRowCodeResult,
                    green: 0,
                    yellow: 0,
                    orange: 0,
                    red: 0,
                    other: 0
                }))
                setRowCode([])
                setLoading(false)
            } else {}

            props.table.map((row) => {
                switch (row.code.charAt(0)) {
                    case '2': {
                        setRowCodeResult((prevRowCodeResult) => ({
                            green: prevRowCodeResult.green + 1,
                            yellow: prevRowCodeResult.yellow,
                            orange: prevRowCodeResult.orange,
                            red: prevRowCodeResult.red,
                            other: prevRowCodeResult.other
                        }))
                        setRowCode((rowCode) => [...rowCode, 'green'])
                        break
                    }
                    case '3': {
                        setRowCodeResult((prevRowCodeResult) => ({
                            green: prevRowCodeResult.green,
                            yellow: prevRowCodeResult.yellow + 1,
                            orange: prevRowCodeResult.orange,
                            red: prevRowCodeResult.red,
                            other: prevRowCodeResult.other
                        }))
                        setRowCode([...rowCode, 'yellow'])
                        break
                    }
                    case '4': {
                        setRowCodeResult((prevRowCodeResult) => ({
                            green: prevRowCodeResult.green,
                            yellow: prevRowCodeResult.yellow,
                            orange: prevRowCodeResult.orange + 1,
                            red: prevRowCodeResult.red,
                            other: prevRowCodeResult.other
                        }))
                        setRowCode([...rowCode, 'orange'])
                        break;
                    }
                    case '5': {
                        setRowCodeResult((prevRowCodeResult) => ({
                            green: prevRowCodeResult.green,
                            yellow: prevRowCodeResult.yellow,
                            orange: prevRowCodeResult.orange,
                            red: prevRowCodeResult.red + 1,
                            other: prevRowCodeResult.other
                        }))
                        setRowCode((rowCode) => [...rowCode, 'red'])
                        break
                    }
                    default: {
                        setRowCodeResult((prevRowCodeResult) => ({
                            green: prevRowCodeResult.green,
                            yellow: prevRowCodeResult.yellow,
                            orange: prevRowCodeResult.orange,
                            red: prevRowCodeResult.red,
                            other: prevRowCodeResult.other + 1
                        }))
                        setRowCode([...rowCode, 'other'])
                        break
                    }
                }
            })
            setLoading(false)
        })()
    }, [props.table])

    return (
        <div>
            <div>
                <span>2xx: {rowCodeResult.green}; </span>
                <span>3xx: {rowCodeResult.yellow}; </span>
                <span>4xx: {rowCodeResult.orange}; </span>
                <span>5xx: {rowCodeResult.red}; </span>
                <span>other: {rowCodeResult.other}</span>
            </div>
            <div>
                {loading ? <h2>Loading...</h2> : null}
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
                            <td className={rowCode[index]}>{row.code}</td>
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