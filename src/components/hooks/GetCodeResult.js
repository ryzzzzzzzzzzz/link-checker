import { useEffect } from "react";

export default function GetCodeResult(props) {
    useEffect(() => {
        if(props.table.length !== 0) {
            props.table.map((row) => {
                return props.getCodeResult(row)
            })
        }
    }, [props.table.length]);
}