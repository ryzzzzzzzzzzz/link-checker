import React, {useState} from 'react';
import axios from 'axios';

// https://gitlab.figvam.ru/users/sign_in
// https://qna.habr.com/q/788145
// https://doka.guide/js/async-in-js/

function Main() {

    const [state, setState] = useState({});

    let getResult = () => {
        getLinesArray();
        getTable();
    }

    let getLinesArray = () => {
        let textaeraVal = document.querySelector('#textarea').value;
        let linesArray = textaeraVal.split(/\n/);
        getStatus(linesArray);
    }

    let getStatus = (linesArray) => {
        return axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            url: 'http://localhost:8000/api/v1/search',
            data: {
                "urls": linesArray,
            }
        })
            .then(response => setState(JSON.stringify(response.data))
        )}

    let getTable = () => {
        const stateData = state.toString();
        const data = JSON.parse(stateData);
        const table = document.createElement('table');

        data.forEach((item) => {
            const tableRow = table.insertRow();
            Object.values(item).forEach((text) => {
                const tableCell = tableRow.insertCell();
                tableCell.textContent = text;
            })
        })
        table.style.border = 'solid 1px black';
        document.body.appendChild(table);
    }

    return (
        <div>
            <textarea name="textarea" id="textarea" cols="30" rows="10"></textarea>
            <div>
                <button id='btn' onClick={getLinesArray}></button>
            </div>
            <div>
                <button id='btn-2' onClick={getTable}></button>
            </div>
        </div>
    )
}

export default Main;