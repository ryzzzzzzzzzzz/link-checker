import { useEffect } from "react";

export default function UseGet(props) {

    useEffect( () => {
        const task = props.token[props.index]
        const timer = props.userLinks.length * 10
        let counter = 0;
        let intervalId = null

        async function fetchTable() {
            const decoder = new TextDecoder('utf-8');
            await fetch(process.env.REACT_APP_FETCH_URL + 'task/' + task.token, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    (async() => {
                        response.body.getReader().read().then(({ value, done }) => {
                            const str = decoder.decode(value)
                            let tableRes = []
                            counter = counter + 1

                            if(counter > timer) {
                                stopInterval()
                            }
                            if(!done) {
                                tableRes = JSON.parse(str).body
                                return props.getTable(tableRes)
                                if(counter > timer  || tableRes.length === props.userLinks[props.index].urls.length ) {
                                    return clearInterval(intervalId)
                                } else {}
                            }
                        })
                    })()
                })
                .catch(error => {
                    console.error(error)}
                )
        }
        if(props.token.length !== 0) {
            intervalId = setInterval(() => fetchTable()
                    .then(() => props.incIndex())
                , 1000)
        } else {}
        function stopInterval() {
            clearInterval(intervalId)
            props.getErrorRequest();
        }
    }, [props.token])
}