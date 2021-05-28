import classes from "./Display.module.css";
import React from "react"
import { isPropertySignature } from "typescript";

type Props = {
    title: string,
    value: number,
}

const Display:React.FC<{title:string, value:number}> = (props) => {
    return <div className={classes.score}>{props.title}: <span>{props.value}
        </span></div>
};

export default Display;