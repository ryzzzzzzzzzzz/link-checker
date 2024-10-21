import React, {useState} from "react";
import Textarea from "../textareas/Textarea";
import Tables from "../tables/Tables";
import Hooks from "../hooks/Hooks";

export default function Main () {
    const [state, setState] = useState({
        token: '',
        urls: [],
    });

    const addUrlsForVerification = (userUrls) => {
        setState((prev) => ({
            ...state,
            urls: userUrls
        }))
    }

    const getToken = (token) => {
        debugger
        setState((prev) => ({
            ...state,
            token: token
        }))
    }

    return (
        <div className='flex-row'>
            <Textarea addUrls={addUrlsForVerification}/>
            <Tables/>
            <Hooks state={state} setToken={getToken}/>
        </div>
    )
}