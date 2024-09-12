import React, {useState} from "react";
import "./../App.css"
import $ from "jquery"

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

    let resultTest = [];
    let intervalID = 0;
    let prevStateTable = [];

    function createLinesArray() {
        let textaeraVal = document.querySelector('#textarea').value;
        let linesArray = textaeraVal.split(/\n/);
        Object.assign(data.urls, linesArray);
        console.log(data);
    }

    async function response(linesArray, res) {
        setLoading(true);
        document.getElementById('textarea').value = '';
        await fetch(process.env.REACT_APP_FETCH_URL_TOKEN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(token => token.json())
            .then(function (token){
                intervalID = setInterval(() => test(token), 100)
            })
    }

    async function test(token) {
        console.log(JSON.stringify(token));
        await fetch(process.env.REACT_APP_FETCH_URL_RESPONSE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(token)
        })
            .then(result => result.json())
            .then(result => resultTest = result.body)
            .then(function(resultTest)
        {
            if(JSON.stringify(resultTest) !== JSON.stringify(prevStateTable)) {
                document.getElementById('table').getElementsByTagName('tbody').innerHTML = '';
                prevStateTable = resultTest.map((el) => el);
                fillTable(resultTest);
            }
            else {
                clearInterval(intervalID);
            }
        })
    }

    function fillTable(resultTest) {
        let tbodyRef = document.getElementById('table').getElementsByTagName('tbody')[0];
        resultTest.forEach(row => {
            let newRow = tbodyRef.insertRow();
            let i = 1;
            let j = 2;
            Object.values(row).forEach(value => {
                let newCell = newRow.insertCell();
                let newText = document.createTextNode(value);
                newCell.appendChild(newText);
                if (i === j) {
                    j = j + 6;
                    switch (value) {
                        case '200 OK':
                            newCell.innerHTML = '<div class="green">' + value + '</div>';
                            setCounter2xx((counter2xx) => { return counter2xx + 1; });
                            break;
                        case '301 Moved Permanently':
                        case '304 Not Modified':
                            newCell.innerHTML = '<div class="yellow-green">' + value + '</div>';
                            setCounter3xx((counter3xx) => { return counter3xx + 1; });
                            break;
                        case '400 Bad Request':
                        case '403 Forbidden':
                        case '404 Not Found':
                        case '413 Request Entity Too Large':
                        case '414 Request-URL Too Long':
                            newCell.innerHTML = '<div class="yellow">' + value + '</div>';
                            setCounter4xx((counter4xx) => { return counter4xx + 1; });
                            break;
                        case '500 Internal Server Error':
                        case '502 Bad Gateway':
                        case '503 Service Unavailable':
                        case '504 Gateway Timeout':
                            newCell.innerHTML = '<div class="red">' + value + '</div>';
                            setCounter5xx((counter5xx) => { return counter5xx + 1});
                            break;
                        default:
                            newCell.innerHTML = '<div class="other">' + value + '</div>';
                            setCounterOther((counterOther) => { return counterOther + 1});
                            break;
                    }
                } else {
                    newCell.innerHTML = '<div>' + value + '</div>';
                }
                i = i + 1;
            })
        })
        setLoading(false);
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
        csvData = $(csvData).text();
        csvData = csvData.toString();
        navigator.clipboard.writeText(csvData).then(() => {console.log('Copied!')})
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
                    <button onClick={btnCopyTable}>Copy links as CSV</button>
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
                            <div>URL</div>
                        </th>
                        <th>
                            <div>CODE</div>
                        </th>
                        <th>
                            <div>TITLE</div>
                        </th>
                        <th>
                            <div>META DESCRIPTION</div>
                        </th>
                        <th>
                            <div>H1</div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <div className='footer'></div>
        </div>
    )
}

export default Main;