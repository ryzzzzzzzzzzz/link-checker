import React, {useState} from "react";
import "./../App.css"

function Main() {

    const [counter200, setCounter200] = useState(0);
    const [counter403, setCounter403] = useState(0);
    const [counter500, setCounter500] = useState(0);
    const [counterOther, setCounterOther] = useState(0);
    const [loading, setLoading] = useState(false);

    let data = {
        urls: ['']
    }

    function createLinesArray() {
        let textaeraVal = document.querySelector('#textarea').value;
        let linesArray = textaeraVal.split(/\n/);
        Object.assign(data.urls, linesArray);
    }

    async function response(linesArray, res) {
        setLoading(true);
        document.getElementById('textarea').value = '';
        await fetch(process.env.REACT_APP_FETCH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(result => result.json())
            .then(result => fillTable(result))}

    function fillTable(result) {
        let tbodyRef = document.getElementById('table').getElementsByTagName('tbody')[0];

        result.forEach(row => {
            let newRow = tbodyRef.insertRow();
            Object.values(row).forEach(value => {
                let newCell = newRow.insertCell();
                let newText = document.createTextNode(value);
                newCell.appendChild(newText);
                switch (value) {
                    case '200 OK': newCell.innerHTML = '<span class="green">' + value + '</span>';
                    setCounter200(counter200 + 1);
                    break;
                    case '403 Forbidden':  newCell.innerHTML = '<span class="yellow">' + value + '</span>';
                    setCounter403(counter403 + 1);
                    break;
                    case '500 Internal Server Error':  newCell.innerHTML = '<span class="red">' + value + '</span>';
                    setCounter500(counter500 + 1);
                    break;
                    default: setCounterOther(counterOther + 1);
                    break;
                }
            })
        })
        setLoading(false);
    }

    return(
        <div>
            <div>
                <textarea id="textarea" onChange={createLinesArray}/>
            </div>
            <div>
                <button onClick={response}>Check links</button>
            </div>
            <div>
                <div>Code 200: {counter200}</div>
                <div>Code 403: {counter403}</div>
                <div>Code 500: {counter500}</div>
                <div>Other: {counterOther}</div>
            </div>
            <div>
                {loading === true && 'Loading...'}
            </div>
            <div>
                <table id='table'>
                    <thead>
                    <tr>
                        <th>URL</th>
                        <th>CODE</th>
                        <th>ERROR</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Main;