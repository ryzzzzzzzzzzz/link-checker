import React, {useState} from 'react';
import TextareaForLinks from "./components/textareas/TextareaForLinks";
import ResultTable from "./components/tables/ResultTable";
import HistoryTable from "./components/tables/HistoryTable";
import UsePost from "./components/hooks/UsePost";
import UseGet from "./components/hooks/UseGet";

/*
Что еще доделать:
- [X] выводить результат на экран
- вынести всё, что можно, в отдельные компоненты
- сделать таблицу истории
- добавить таблице истории функциональности
- исправить проблему перезагрузки страницы (чтобы таблица истории где-то сохранялась)
- исправить зависание на некоторых ссылках
- выводить на экран проблемные ссылки, из-за которых все зависает
- добавить реализацию новой ручки на процент прогресса
*/

const App = () => {
    const [index, setIndex] = useState(0);
    const [userLinks, setUserLinks] = useState([]);
    const [token, setToken] = useState([]);
    const [table, setTable] = useState([]);
    const [errorRequest, setErrorRequest] = useState(false);

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
    }

    const getErrorRequest = () => {
        setErrorRequest(true)
    }

    return (
        <div className="container">
            <UsePost userLinks={userLinks} getToken={getToken} index={index}/>
            <UseGet userLinks={userLinks} token={token} getTable={getTable} index={index} incIndex={incIndex} getErrorRequest={getErrorRequest}/>
            <h1>Link checker</h1>
            <div className='flex-row'>
                <div className='flex-large'>
                    {errorRequest ? <h2>Ups... Something went wrong</h2> : null}
                    <h2>Add links</h2>
                    <TextareaForLinks addUserLink={addUserLink}/>
                </div>
                <div className='flex-large'>
                    <h2>Result table</h2>
                    <ResultTable userLinks={userLinks} index={index} table={table}/>
                </div>
                <div className='flex-large'>
                    <h2>History table</h2>
                    <HistoryTable/>
                </div>
            </div>
        </div>
    )
}

export default App;
