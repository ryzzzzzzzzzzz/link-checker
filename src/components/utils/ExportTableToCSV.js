import {CSVDownload} from "react-csv";

const ExportTableToCSV = (props) => {
    const headers = [
        {label: 'URL', key: 'url'},
        {label: 'CODE', key: 'code'},
        {label: 'TITLE', key: 'title'},
        {label: 'DESCRIPTION', key: 'meta description'},
        {label: 'H1', key: 'h1'}
    ]

    return (
        <div>
            <CSVDownload
                headers={headers}
                data={props.table}
                filename='Table.csv'
                target='_blank'
            >
                Download CSV
            </CSVDownload>
        </div>
    )
}

export default ExportTableToCSV;