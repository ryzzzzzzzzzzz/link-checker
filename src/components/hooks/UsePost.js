import { useEffect } from "react";

export default function UsePost(props) {
    useEffect( () => {
        async function fetchToken() {
            let request = JSON.stringify(props.userLinks[props.index])
            await fetch(process.env.REACT_APP_FETCH_URL + 'new_task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: request
            })
                .then(tokenRes => tokenRes.json())
                .then(json => {props.getToken(json)})
        }
        debugger
        if(props.userLinks.length !== 0) {
            fetchToken()
                .then(() => {})
        } else {}
    }, [props.userLinks])
}