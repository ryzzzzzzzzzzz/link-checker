import React, {useState} from 'react';
import axios from 'axios';
import autosize from "autosize/dist/autosize";
import $ from 'jquery';

/*
https://doka.guide/css/grid-guide/
https://doka.guide/css/flexbox-guide/
https://qna.habr.com/q/1131854
https://habr.com/ru/companies/ruvds/articles/445276/
https://legacy.reactjs.org/docs/hooks-effect.html
https://react.dev/learn/you-might-not-need-an-effect
https://react.dev/learn/describing-the-ui
https://music.yandex.ru/home
https://calendar.yandex.ru/week?uid=862755172
https://www.kinopoisk.ru/?utm_referrer=www.yandex.ru
https://gitlab.figvam.ru/users/sign_in
https://ru.stackoverflow.com/
https://css-tricks.com/
https://doka.guide/js/promise/
https://stepik.org/catalog/04
https://www.simplilearn.com/tutorials/docker-tutorial/what-is-dockerfile
https://habr.com/ru/companies/docsvision/articles/335988/
*/

function Main() {

    const [state, setState] = useState({});

    let getResult = () => {
        getLinesArray();
        getTable();
    }

    let getLinesArray = () => {
        let textaeraVal = document.querySelector('#textarea').value;
        let linesArray = textaeraVal.split(/\n/);
        console.log(linesArray);
        getStatus(linesArray)
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
            .then(response => setState(JSON.stringify(response.data)))
    }

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
        table.setAttribute("class", "table");
        document.body.appendChild(table);
        autosize($('textarea'));
        highlight();
    }

    let highlight = () => {
        let patterns = [
            {text: "200 OK", classes: ['green']},
            {text: "500 Internal Server Error", classes: ['red']},
        ];
        const marker = ( text, patterns ) => {
            return patterns.reduce( ( result, current ) => {
                let regexp = new RegExp(current.text, 'g');
                let style = current.classes.join(' ');

                return result.replace( regexp, `<span class="${ style }">${ current.text }</span>` );
            }, text );
        }

        let text = document.body.innerHTML;

        document.body.innerHTML = marker( text, patterns );
    }

    return (
        <div>
            <div className="divBtn">
                <button id='btn' onClick={getLinesArray}>Create request</button>
                <button id='btn-2' onClick={getTable}>Get table with result</button>
            </div>
            <div contentEditable className="divText">
                <textarea name="textarea" id="textarea" cols="30" rows="10"></textarea>
            </div>
        </div>
    )
}

export default Main;