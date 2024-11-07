import { useContext, useState } from "react";
import {Context} from "../../contexts/index";
import Button from "../button/Button";

export default function Textarea () {
    const initialValue = ''
    const [value, setValue] = useState(initialValue);
    const {linksActions} = useContext(Context)

    function handleClick() {
        const linksByLine = value.split(/\r\n|\r|\n/g)
        linksActions.addLinks(linksByLine);
        setValue(initialValue)
    }

    return (
        <section>
            <Button onClick={handleClick}>Check links</Button>
            <textarea id="textarea" rows='25'
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
            />
        </section>
    )
}