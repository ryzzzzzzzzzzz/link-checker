import {CSVDownload} from "react-csv";

export function ExportTableToCSV(props) {
    const headers = [
        {label: 'URL', key: 'url'},
        {label: 'CODE', key: 'code'},
        {label: 'TITLE', key: 'title'},
        {label: 'DESCRIPTION', key: 'meta description'},
        {label: 'H1', key: 'h1'}
    ]

    debugger
    return (
        <div>
            <CSVDownload
                headers={headers}
                data={props.table}
                filename='table.csv'
                target='_blank'
            >
                Download CSV
            </CSVDownload>
        </div>
    )
}