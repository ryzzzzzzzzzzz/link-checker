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
            <button type='submit' className='button muted-button'>Check links</button>
            <textarea id="textareaForLinks" cols="30" rows="10" name='urls' value={userLink.urls}
                      onChange={handleTextareaChange}
            />
        </form>
    )
}

export default TextareaForLinks;