export function countingResults(table, codeResults, setCodeResults) {
    setCodeResults({green: 0, yellow: 0, orange: 0, red: 0, other: 0})
    table.map((row) => {
        switch(row.code.charAt(0)){
            case '2': {
                setCodeResults((prev) => ({...codeResults, green: prev.green + 1}))
                break
            }
            case '3': {
                setCodeResults((prev) => ({...codeResults, yellow: prev.yellow + 1}))
                break
            }
            case '4': {
                setCodeResults((prev) => ({...codeResults, orange: prev.orange + 1}))
                break
            }
            case '5': {
                setCodeResults((prev) => ({...codeResults, red: prev.red + 1}))
                break
            }
            default: {
                setCodeResults((prev) => ({...codeResults, other: prev.other + 1}))
                break
            }
        }
        return ''
    })
}