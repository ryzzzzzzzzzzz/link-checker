import { useContext, useState } from "react";
import {Context} from "../../contexts/index";

export default function Textarea () {
    const initialValue = ''
    const [value, setValue] = useState(initialValue);
    const {linksActions} = useContext(Context)

    function onClick() {
        const linksByLine = value.split(/\r\n|\r|\n/g)
        linksActions.addLinks(linksByLine);
        setValue(initialValue)
    }

    return (
        <section>
            <button onClick={onClick}>Check links</button>
            <textarea id="textarea" rows='25'
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
            />
        </section>
    )
}