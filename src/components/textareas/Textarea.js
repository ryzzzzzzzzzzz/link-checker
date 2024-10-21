import React, {useEffect, useState} from 'react';
import Button from "../generic/Button";
import {fetchPost} from "../utils/fetchPost";

const Textarea = (props) => {
    const initialInput = ''
    const [input, setInput] = useState(initialInput);

    function handleSubmit(event) {
        event.preventDefault();
        if (!input) return
        const linksByLine = input.split(/\r\n|\r|\n/g);
        props.addLinks(linksByLine);
        setInput(initialInput)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Button type={'submit'} value={'Check Links'}/>
            <textarea id="textarea" cols="30" rows="10" name='urls'
                      value={input} onChange={(
                          (e) =>
                              setInput(e.target.value))}
            />
        </form>
    )
}

export default Textarea;