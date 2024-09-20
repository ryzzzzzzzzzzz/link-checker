import React, {useState} from "react";
import "./../App.css"

function Main() {

    const [counter2xx, setCounter2xx] = useState(0);
    const [counter3xx, setCounter3xx] = useState(0);
    const [counter4xx, setCounter4xx] = useState(0);
    const [counter5xx, setCounter5xx] = useState(0);
    const [counterOther, setCounterOther] = useState(0);
    const [loading, setLoading] = useState(false);

    let data = {
        urls: [''],
    }

    let resultTable = [];
    let intervalID = 0;
    let prevStateTable = [];

    function createLinesArray() {
        let textaeraVal = document.querySelector('#textarea').value;
        let linesArray = textaeraVal.split(/\n/);
        Object.assign(data.urls, linesArray);
    }

    async function response(linesArray, res) {
        setLoading(true);
        document.getElementById('textarea').value = '';
        await fetch(process.env.REACT_APP_FETCH_URL + 'new_task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(token => token.json())
            .then(function (token){
                intervalID = setInterval(() => getResult(token.token), 2000)
            })
    }

    async function getResult(token) {
        await fetch(process.env.REACT_APP_FETCH_URL + 'task/' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(result => result.json())
            .then(result => resultTable = result.body)
            .then(function(resultTable)
        {
            if(JSON.stringify(resultTable) !== JSON.stringify(prevStateTable)) {
                document.getElementById('table').getElementsByTagName('tbody').innerHTML = '';
                prevStateTable = resultTable.map((el) => el);
                fillTable(resultTable);
            }
            else {
                clearInterval(intervalID);
            }
        })
    }

    function fillTable(resultTable) {
        let tbodyRef = document.getElementById('table').getElementsByTagName('tbody')[0];
        resultTable.forEach(row => {
            let newRow = tbodyRef.insertRow();
            let i = 1;
            let j = 2;
            Object.values(row).forEach(value => {
                let newCell = newRow.insertCell();
                let newText = document.createTextNode(value);
                newCell.appendChild(newText);
                newCell.innerHTML = value;
                if (i === j) {
                    j = j + 6;
                    newCell.classList.add('codeColClass');
                }
                i = i + 1;
            })
        })
        setLoading(false);
        colorCode();
    }

    function colorCode() {
        let tab = document.getElementById('table');
        let codeCellCollection = document.getElementsByClassName('codeColClass');
        for (let i = 0; i < codeCellCollection.length; i++) {
            let codeCol = codeCellCollection[i];
            codeCol = codeCol.textContent;
            for (let i = 1; i <= tab.rows.length - 1; i++) {
                switch (codeCol) {
                    case '200 OK':
                        document.getElementById('table').rows[i].cells[1].classList.add('green');
                        setCounter2xx((counter2xx) => { return counter2xx + 1; });
                        break;
                    case '301 Moved Permanently':
                    case '304 Not Modified':
                        document.getElementById('table').rows[i].cells[1].classList.add('yellow-green');
                        setCounter3xx((counter3xx) => { return counter3xx + 1; });
                        break;
                    case '400 Bad Request':
                    case '403 Forbidden':
                    case '404 Not Found':
                    case '413 Request Entity Too Large':
                    case '414 Request-URL Too Long':
                        document.getElementById('table').rows[i].cells[1].classList.add('yellow');
                        setCounter4xx((counter4xx) => { return counter4xx + 1; });
                        break;
                    case '500 Internal Server Error':
                    case '502 Bad Gateway':
                    case '503 Service Unavailable':
                    case '504 Gateway Timeout':
                        document.getElementById('table').rows[i].cells[1].classList.add('red');
                        setCounter5xx((counter5xx) => { return counter5xx + 1});
                        break;
                    default:
                        document.getElementById('table').rows[i].cells[1].classList.add('other');
                        setCounterOther((counterOther) => { return counterOther + 1});
                        break;
                }
            }
        }
    }

    function btnCopyTable () {
        let csvData = [];
        let rows = document.getElementsByTagName('tr');
        for(let i = 0; i < rows.length; i++){
            let cols = rows[i].querySelectorAll('td, th');
            let csvrow = [];
            for(let j = 0; j < cols.length; j++){
                csvrow.push(cols[j].innerHTML);
            }
            csvData.push(csvrow.join(','));
        }
        csvData = csvData.join('\n');
        // csvData = $(csvData).text();
        csvData = csvData.toString();
        navigator.clipboard.writeText(csvData)
            .then(() => console.log('Copied!'))
    }

    return(
        <div className='container'>
            <div className='header'>
                <div className='logo-container'>
                    <span className='logo'>Link checker</span>
                </div>
            </div>
            <div className='textarea-container'>
                <textarea id="textarea" onChange={createLinesArray}/>
            </div>

                <div className='button-container-1'>
                    <button onClick={response}>Check links</button>
                </div>
                <div className='button-container-2'>
                    <button onClick={btnCopyTable} id='copy'>Copy links as CSV</button>
                </div>
            <div className='result-container'>
                <div><span id='result-2xx'>Code 2xx: {counter2xx}</span></div>
                <div><span id='result-3xx'>Code 3xx: {counter3xx}</span></div>
                <div><span id='result-4xx'>Code 4xx: {counter4xx}</span></div>
                <div><span id='result-5xx'>Code 5xx: {counter5xx}</span></div>
                <div><span id='result-other'>Other: {counterOther}</span></div>
            </div>
            <div className='loading-container'>
            {loading === true &&
                    <div className='loader'>
                        <div className='psoload'>
                            <div className="straight"></div>
                            <div className="curve"></div>
                            <div className="center"></div>
                            <div className="inner"></div>
                        </div>
                    </div>}
            </div>
            <div className='table-container'>
                <table id='table' cellPadding='2' cellSpacing='5'>
                    <thead>
                    <tr>
                        <th>
                            URL
                        </th>
                        <th>
                            CODE
                        </th>
                        <th>
                            TITLE
                        </th>
                        <th>
                            META DESCRIPTION
                        </th>
                        <th>
                            H1
                        </th>
                    </tr>
                    </thead>
                    <tbody className='tbody'>
                    </tbody>
                </table>
            </div>
            <div className='footer'></div>
        </div>
    )
}

export default Main;