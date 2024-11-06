export function countingResults(table, setCodeResults) {
    setCodeResults({green: 0, yellow: 0, orange: 0, red: 0, other: 0})
    table.forEach((row) => {
        switch(row.code.charAt(0)){
            case '2': {
                setCodeResults((prev) => {
                    return ({...prev, green: prev.green + 1});
                })
                break
            }
            case '3': {
                setCodeResults((prev) => {
                    return ({...prev, yellow: prev.yellow + 1});
                })
                break
            }
            case '4': {
                setCodeResults((prev) => {
                    return ({...prev, orange: prev.orange + 1});
                })
                break
            }
            case '5': {
                setCodeResults((prev) => {
                    return ({...prev, red: prev.red + 1});
                })
                break
            }
            default: {
                setCodeResults((prev) => {
                    return ({...prev, other: prev.other + 1});
                })
                break
            }
        }
    })
}