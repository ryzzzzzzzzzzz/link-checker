export async function fetchPost(urls) {
        try {
            return await fetch(process.env.REACT_APP_FETCH_URL + 'new_task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({urls: urls})
            })
                .then((token) => {
                    token.json()
                    debugger
                })
        } catch (error) {
            console.log(error)
            return []
        }
}