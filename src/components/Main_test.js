import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {render} from 'react-dom';

function Main_test() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState({});
    const [error, setError] = useState(null);
    const [linksArray, setLinksArray] = useState( ['']);
    const [clickFunc, setClickFunc] = useState(false);

    // {"urls": ['https://bobbyhadz.com/blog/javascript-split-string-by-newline']}

    let handleChange = e => {
        setLinksArray(document.getElementById('textarea').value.split('\n'))
    }

    useEffect(() => {
        axios.post('http://localhost:8000/api/v1/search', {data: {"urls": linksArray}}, {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                setData(JSON.stringify(response.data));
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        return () => {
            console.log(linksArray);
        }
    }, [clickFunc]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    return (
        <div>
            <h1>Links</h1>
            <textarea name="textarea" id="textarea" onChange={handleChange}/>
            <button onClick={setClickFunc(true)}>Get result</button>
            {/*{data.toString()}*/}
        </div>
    )
}

export default Main_test;