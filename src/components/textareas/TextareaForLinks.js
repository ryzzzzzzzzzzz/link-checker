import React, {useState} from 'react';

const TextareaForLinks = (props) => {
    const initialFormState = {urls: ''}
    const [userLink, setUserLink] = useState(initialFormState)

    const handleTextareaChange = (event) => {
        setUserLink({...userLink, urls: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(!userLink.urls) return

        const userLinkByLine = userLink.urls.split(/\r\n|\r|\n/g)
        props.addUserLink({urls: userLinkByLine})
        setUserLink(initialFormState)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Links</label>
            <div className='button-container-1'>
                <button type='submit' className='button muted-button'>Check links</button>
            </div>
            <div className='button-container-2'>
                <button id='copy' className='button muted-button'>Copy links as CSV</button>
            </div>
            <textarea id="textarea" cols="30" rows="10" name='urls' value={userLink.urls}
                      onChange={handleTextareaChange}
            />
        </form>
    )
}

export default TextareaForLinks;