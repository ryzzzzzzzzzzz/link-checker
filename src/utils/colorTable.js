export function colorTable(code) {
    switch (code.charAt(0)) {
        case '2': {
            return 'green'
        }
        case '3': {
            return 'yellow'
        }
        case '4': {
            return 'orange'
        }
        case '5': {
            return 'red'
        }
        default: {
            return 'other'
        }
    }
}