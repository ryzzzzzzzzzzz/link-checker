import React, {useState} from "react";
import "./../App.css"

/*
https://github.com/
https://gitlab.figvam.ru/
https://it-dev-journal.ru/articles/struktura-react-prilozheniya
https://tproger.ru/translations/react-basic-weather-app
https://redux.js.org/tutorials/essentials/part-1-overview-concepts
https://internetingishard.netlify.app/html-and-css/index.html
https://javascript.ru/forum/dom-window/76608-vyvesti-soobshhenie-o-kopirovanii-teksta.html
https://qna.habr.com/q/788145
https://apidog.com/blog/websocket-connection-failed/
https://ru.stackoverflow.com/questions/436662/javascript-promise-Как-прервать-длинную-цепочку-then
https://qna.habr.com/q/1054412
https://learn.javascript.ru/promise-error-handling
https://kakoysegodnyadennedeli.ru/
https://e.ggtimer.com/
https://stihi.ru/cgi-bin/assist.pl
https://www.earthcam.com/
https://www.rainymood.com/
https://eelslap.com/
https://bomomo.com/
https://cat-bounce.com/
https://ashmanov.net/ru/demos/stylist/
https://www.eso.org/public/images/eso1242a/zoomable/
https://yandex.ru/company/
https://randstuff.ru/ask/
*/

/* Blacklist:
https://multator.ru/draw/ - вечная загрузка
http://www.sokra.ru/ - вечная загрузка
https://freshswag.ru/ - вечная загрузка
https://stihi.ru/cgi-bin/assist.pl - 503, хотя сайт доступен
https://bomomo.com/ - 503, хотя сайт доступен
http://ww1.proteys.info/ - что то странное
*/

function Main() {

    const [counter2xx, setCounter2xx] = useState(0);
    const [counter3xx, setCounter3xx] = useState(0);
    const [counter4xx, setCounter4xx] = useState(0);
    const [counter5xx, setCounter5xx] = useState(0);
    const [counterOther, setCounterOther] = useState(0);
    const [counterAll, setCounterAll] = useState(0);
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
                intervalID = setInterval(() => getResult(token.token), 200)
            })
    }

    async function getResult(token) {
        let testLink = process.env.REACT_APP_FETCH_URL + 'task/' + token;
        await fetch(testLink, {
            method: 'GET',
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
            .catch(error => console.log(error.message));
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
        for (let i = 1; i <= tab.rows.length; i++) {
            let codeCell = document.getElementById('table').rows[i].cells[1].textContent
            switch (codeCell) {
                case '200 OK':
                    document.getElementById('table').rows[i].cells[1].classList.add('green');
                    setCounter2xx((counter2xx) => { return counter2xx + 1; });
                    setCounterAll((counterAll) => { return counterAll + 1; });
                    break;
                case '301 Moved Permanently':
                case '304 Not Modified':
                    document.getElementById('table').rows[i].cells[1].classList.add('yellow-green');
                    setCounter3xx((counter3xx) => { return counter3xx + 1; });
                    setCounterAll((counterAll) => { return counterAll + 1; });
                    break;
                case '400 Bad Request':
                case '403 Forbidden':
                case '404 Not Found':
                case '413 Request Entity Too Large':
                case '414 Request-URL Too Long':
                    document.getElementById('table').rows[i].cells[1].classList.add('yellow');
                    setCounter4xx((counter4xx) => { return counter4xx + 1; });
                    setCounterAll((counterAll) => { return counterAll + 1; });
                    break;
                case '500 Internal Server Error':
                case '502 Bad Gateway':
                case '503 Service Unavailable':
                case '503 Service Temporarily Unavailable':
                case '504 Gateway Timeout':
                    document.getElementById('table').rows[i].cells[1].classList.add('red');
                    setCounter5xx((counter5xx) => { return counter5xx + 1});
                    setCounterAll((counterAll) => { return counterAll + 1; });
                    break;
                default:
                    document.getElementById('table').rows[i].cells[1].classList.add('other');
                    setCounterOther((counterOther) => { return counterOther + 1});
                    setCounterAll((counterAll) => { return counterAll + 1; });
                    break;
            }
        }

        // let tab = document.getElementById('table');
        // let codeCellCollection = document.getElementsByClassName('codeColClass');
        // for (let i = 1; i <= tab.rows.length - 1; i++) {
        //     let codeCol = codeCellCollection[i];
        //     codeCol = codeCol.textContent;
        //     // console.log(codeCol);
        //     // for (let i = 1; i <= tab.rows.length - 1; i++) {
        //         switch (codeCol) {
        //             case '200 OK':
        //                 document.getElementById('table').rows[i].cells[1].classList.add('green');
        //                 setCounter2xx((counter2xx) => { return counter2xx + 1; });
        //                 debugger
        //                 break;
        //             case '301 Moved Permanently':
        //             case '304 Not Modified':
        //                 document.getElementById('table').rows[i].cells[1].classList.add('yellow-green');
        //                 setCounter3xx((counter3xx) => { return counter3xx + 1; });
        //                 break;
        //             case '400 Bad Request':
        //             case '403 Forbidden':
        //             case '404 Not Found':
        //             case '413 Request Entity Too Large':
        //             case '414 Request-URL Too Long':
        //                 document.getElementById('table').rows[i].cells[1].classList.add('yellow');
        //                 setCounter4xx((counter4xx) => { return counter4xx + 1; });
        //                 break;
        //             case '500 Internal Server Error':
        //             case '502 Bad Gateway':
        //             case '503 Service Unavailable':
        //             case '504 Gateway Timeout':
        //                 document.getElementById('table').rows[i].cells[1].classList.add('red');
        //                 setCounter5xx((counter5xx) => { return counter5xx + 1});
        //                 debugger
        //                 break;
        //             default:
        //                 document.getElementById('table').rows[i].cells[1].classList.add('other');
        //                 setCounterOther((counterOther) => { return counterOther + 1});
        //                 break;
        //         }
            // }
        }


    function btnCopyTable () {
        let csvData = [];
        let rows = document.getElementsByTagName('tr');
        for(let i = 0; i < rows.length - 1; i++){
            let cols = rows[i].querySelectorAll('td, th');
            let csvrow = [];
            for(let j = 0; j < cols.length; j++){
                csvrow.push(cols[j].innerHTML);
            }
            csvData.push(csvrow.join(','));
        }
        csvData = csvData.join('\n');
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
                <div><span id='result-all'>All: {counterAll}</span></div>
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