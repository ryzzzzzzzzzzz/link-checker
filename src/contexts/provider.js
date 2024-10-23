import { useState } from 'react';
import { Context } from './index'

export const Provider = ({ children }) => {
    const [links, setLinks] = useState([])

    const linksActions = {
        addLinks: (newArrayLinks) => {
            setLinks([
                ...links,
                {urls: newArrayLinks}
            ])
        }
    }

    return (
        <Context.Provider value={{ links, linksActions }}>
            {children}
        </Context.Provider>
    )
}