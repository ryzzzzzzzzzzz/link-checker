import React, {useState} from 'react';
import TextareaForLinks from "./components/textareas/TextareaForLinks";
import ResultTable from "./components/tables/ResultTable";
import HistoryTable from "./components/tables/HistoryTable";
import UsePost from "./components/hooks/UsePost";
import UseGet from "./components/hooks/UseGet";
import GetCodeResult from "./components/hooks/GetCodeResult";
import ExportTableToCSV from "./components/utils/ExportTableToCSV";

const App = () => {
    const [index, setIndex] = useState(0);
    const [userLinks, setUserLinks] = useState([]);
    const [token, setToken] = useState([]);
    const [table, setTable] = useState([]);
    const [historyTable, setHistoryTable] = useState([]);
    const [errorRequest, setErrorRequest] = useState(false);
    const [rowCodeResult, setRowCodeResult] = useState({
        green: 0,
        yellow: 0,
        orange: 0,
        red: 0,
        other: 0
    })
    const [rowCode, setRowCode] = useState([])
    const [isDownloadTable, setIsDownloadTable] = useState(0)

    const incIndex = () => {
        setIndex(index + 1)
    }

    const addUserLink = (userLink) => {
        setUserLinks([...userLinks, userLink])
        setErrorRequest(false)
    }

    const getToken = (tokenRes) => {
        setToken([...token, tokenRes])
    }

    const getTable = (tableRes) => {
        setTable(() => tableRes)
        if (tableRes.length === userLinks[index].urls.length) {
            for(let i = 0; i < tableRes.length; i++) {
                setHistoryTable((historyTable) => [...historyTable, tableRes[i]])
            }
        } else {}
    }

    const getErrorRequest = () => {
        setErrorRequest(true)
    }

    const getCodeResult = (row) => {
        const reRender = table.length > 0 && table.length < userLinks[index - 1].urls.length
        if(reRender) {
            setRowCodeResult(prevRowCodeResult => ({
                ...prevRowCodeResult,
                green: 0,
                yellow: 0,
                orange: 0,
                red: 0,
                other: 0
            }))
            setRowCode([])
        } else {}
        switch (row.code.charAt(0)) {
            case '2': {
                setRowCodeResult((prevRowCodeResult) => ({
                    green: prevRowCodeResult.green + 1,
                    yellow: prevRowCodeResult.yellow,
                    orange: prevRowCodeResult.orange,
                    red: prevRowCodeResult.red,
                    other: prevRowCodeResult.other
                }))
                setRowCode((rowCode) => [...rowCode, 'green'])
                break
            }
            case '3': {
                setRowCodeResult((prevRowCodeResult) => ({
                    green: prevRowCodeResult.green,
                    yellow: prevRowCodeResult.yellow + 1,
                    orange: prevRowCodeResult.orange,
                    red: prevRowCodeResult.red,
                    other: prevRowCodeResult.other
                }))
                setRowCode([...rowCode, 'yellow'])
                break
            }
            case '4': {
                setRowCodeResult((prevRowCodeResult) => ({
                    green: prevRowCodeResult.green,
                    yellow: prevRowCodeResult.yellow,
                    orange: prevRowCodeResult.orange + 1,
                    red: prevRowCodeResult.red,
                    other: prevRowCodeResult.other
                }))
                setRowCode([...rowCode, 'orange'])
                break;
            }
            case '5': {
                setRowCodeResult((prevRowCodeResult) => ({
                    green: prevRowCodeResult.green,
                    yellow: prevRowCodeResult.yellow,
                    orange: prevRowCodeResult.orange,
                    red: prevRowCodeResult.red + 1,
                    other: prevRowCodeResult.other
                }))
                setRowCode((rowCode) => [...rowCode, 'red'])
                break
            }
            default: {
                setRowCodeResult((prevRowCodeResult) => ({
                    green: prevRowCodeResult.green,
                    yellow: prevRowCodeResult.yellow,
                    orange: prevRowCodeResult.orange,
                    red: prevRowCodeResult.red,
                    other: prevRowCodeResult.other + 1
                }))
                setRowCode([...rowCode, 'other'])
                break
            }
        }
    }

    const downloadTable = (num) => {
        setIsDownloadTable(num)
        setTimeout(() => setIsDownloadTable(0), 1000)
    }

    particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ff6e48"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 1,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 10,
                random: false,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ff6e48",
                opacity: 1,
                width: 3
            },
            move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    return (
        <div className="container">
            <div id="particles-js" class="hintergrund"></div>
            <UsePost userLinks={userLinks}
                     getToken={getToken}
                     index={index}
            />
            <UseGet userLinks={userLinks}
                    token={token}
                    getTable={getTable}
                    index={index}
                    incIndex={incIndex}
                    getErrorRequest={getErrorRequest}
            />
            <GetCodeResult getCodeResult={getCodeResult}
                           userLinks={userLinks}
                           index={index}
                           table={table}
            />
            <div className='header'>
                <div className='logo-container'>
                    <h1 className='logo'>Link checker</h1>
                </div>
            </div>
            <div className='flex-row'>
                <div className='textarea-container'>
                    {errorRequest ? <h2>Ups... Something went wrong</h2> : null}
                    <h2>Add links</h2>
                    <TextareaForLinks addUserLink={addUserLink}/>
                </div>
                <div className='flex-large'>
                    <h2>Result table</h2>
                    <div className='button-container-2'>
                        <button id='copy' className='button muted-button' onClick={() => downloadTable(1)}>
                            Copy links from Result table as CSV
                        </button>
                        {isDownloadTable === 1 ? <ExportTableToCSV table={table}/> : null}
                    </div>
                    <ResultTable userLinks={userLinks} index={index} table={table}
                                 rowCodeResult={rowCodeResult} rowCode={rowCode}/>
                    </div>
                <div className='flex-large'>
                    <h2>History table</h2>
                    <button id='copy' className='button muted-button' onClick={() => downloadTable(2)}>
                        Copy links from History table as CSV
                    </button>
                    {isDownloadTable === 2 ? <ExportTableToCSV table={historyTable}/> : null}
                    <HistoryTable historyTable={historyTable}
                                  rowCodeResult={rowCodeResult} rowCode={rowCode}/>
                </div>
            </div>
            <div className='footer'></div>
        </div>
    )
}

export default App;
