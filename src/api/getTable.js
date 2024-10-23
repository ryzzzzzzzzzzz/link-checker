export async function getTable(token, cease, createTable){
    let counter = 0
    let timer = cease * 2
    let interval = setInterval(() => {
        fetch(process.env.REACT_APP_FETCH_URL + 'task/' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(table => {
                return table.json()
            })
            .then(table => {
                createTable(table)
                counter++
                if(table.body.length === cease || counter > timer){
                    clearInterval(interval)
                }
            })
            .catch(error => console.log(error))
    }, 2000)
}