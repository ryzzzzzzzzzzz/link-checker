

function Main() {

    let data = {
        urls: ['']
    }

    function createLinesArray(btnCount) {
        let textaeraVal = document.querySelector('#textarea').value;
        let linesArray = textaeraVal.split(/\n/);
        Object.assign(data.urls, linesArray);
    }

    async function response(linesArray, res) {
        await fetch("http://localhost:8000/api/v1/search", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => createTable(result))
    }

    function createTable(result) {
        const table = document.getElementById('table');
        table.setAttribute('border', '1');
        const headerRow = document.createElement('tr');
        Object.keys(result[0]).forEach(key => {
            const th = document.createElement('th');
            th.appendChild(document.createTextNode(key));
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        result.forEach(item => {
            const row = document.createElement('tr');
            Object.values(item).forEach(value => {
                const td = document.createElement('td');
                td.appendChild(document.createTextNode(value));
                row.appendChild(td);
            });
            table.appendChild(row);
        });
        document.body.appendChild(table);
        highlight();
    }

    let highlight = () => {
        let patterns = [
            {text: "200 OK", classes: ['green']},
            {text: "500 Internal Server Error", classes: ['red']},
            {text: "403 Forbidden", classes: ['yellow']},
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

    return(
        <div>
            <div>
                <textarea id="textarea" onChange={createLinesArray}/>
            </div>
            <div>
                <button onClick={response}>Click me</button>
            </div>
            <div>
                <table id='table'></table>
            </div>
        </div>
    )
}

export default Main;