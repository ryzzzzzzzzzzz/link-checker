import React, {useState} from "react";
import "./../App.css"

function Main() {

    const [counter200, setCounter200] = useState(0);
    const [counter404, setCounter404] = useState(0);
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
            let i = 1;
            let j = 2;
            Object.values(row).forEach(value => {
                let newCell = newRow.insertCell();
                let newText = document.createTextNode(value);
                newCell.appendChild(newText);
                if (i === j) {
                    j = j + 3;
                    switch (value) {
                        case '200 OK':
                            newCell.innerHTML = '<div class="green">' + value + ' ' + '</div>';
                            setCounter200((counter200) => { return counter200 + 1; });
                            break;
                        case '404 Not Found':
                            newCell.innerHTML = '<div class="yellow">' + value + ' ' + '</div>';
                            setCounter404((counter404) => { return counter404 + 1; });
                            break;
                        case '500 Internal Server Error':
                            newCell.innerHTML = '<div class="red">' + value + ' ' + '</div>';
                            setCounter500((counter500) => { return counter500 + 1});
                            break;
                        default:
                            newCell.innerHTML = '<div>' + value + '</div>';
                            setCounterOther((counterOther) => { return counterOther + 1});
                            break;
                    }
                } else {
                    newCell.innerHTML = '<div>' + value + ' ' + '</div>';
                }
                i = i + 1;
            })
        })
        setLoading(false);
    }

    function btnCopyTable () {
        let tableForCopy = document.getElementById('table').outerHTML;
        tableForCopy = tableForCopy
            .replaceAll('\n', '<br style="mso-data-placement:same-cell;"/>')
            .replaceAll('<td','<td style="vertical-align: top;"');
        navigator.clipboard.writeText(tableForCopy)
        .then(() => {console.log('Copied!')})
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
                    <button onClick={btnCopyTable}>Copy links</button>
                </div>
            <div className='result-container'>
                <div><span id='result-200'>Code 200: {counter200}</span></div>
                <div><span id='result-400'>Code 404: {counter404}</span></div>
                <div><span id='result-500'>Code 500: {counter500}</span></div>
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
                <table id='table' cellPadding='2' cellSpacing='5






                '>
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
            <div className='footer'></div>
        </div>
    )
}

export default Main;