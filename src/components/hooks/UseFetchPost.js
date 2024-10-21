import {useState, useEffect} from 'react'

export default function useFetchPost(props) {
    const [isSetToken, setIsSetToken] = useState(false)
    const {state} = props
    debugger

    if(state.urls.length > 0) {
        setIsSetToken(true)
    }

    useEffect(() => {
        async function fetchPost() {
            try {
                fetch(
                    process.env.REACT_APP_FETCH_URL + 'new_task',
                    {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({urls: state.urls})
                    }
                )
                    .then(res => res.json())
                    .then(json => console.log(json))
            } catch(error) {}
        }
        if(state.urls.length > 0) {
            fetchPost().then(() => {})
        }
    },
        [isSetToken])
    debugger
    if(state.token !== ''){
        props.getToken(1)
    }
}