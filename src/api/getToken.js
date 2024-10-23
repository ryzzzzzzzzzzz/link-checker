export async function getToken(links){
    return new Promise((resolve, reject) => {
        try {
            fetch(process.env.REACT_APP_FETCH_URL + 'new_task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({urls: links.at(-1).urls})
            })
                .then(token => token.json())
                .then(token => resolve(token.token))
        } catch {
            reject('')
        }
    })
}