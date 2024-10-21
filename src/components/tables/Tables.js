import React from 'react'
import TableResults from "./table/TableResults";
import TableHistory from "./table/TableHistory";

export default function Tables() {
    return (
        <div className='flex-row'>
            <div className='flex-large'>
                <h2>Result table</h2>
                <TableResults/>
            </div>
            <div className='flex-large'>
                <h2>History table</h2>
                <TableHistory/>
            </div>
        </div>
    )
}