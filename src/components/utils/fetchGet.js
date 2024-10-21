export async function fetchGet(token) {
    try {
        return await fetch(process.env.REACT_APP_FETCH_URL + 'task/' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                console.log(response)
                debugger
            })
    } catch (error) {
        console.log(error)
        return []
    }
}