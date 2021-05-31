import classes from "./Display.module.css";
import React from "react"


const Display:React.FC<{title:string, value:number | null}> = (props) => {
    return <div className={classes.score}>{props.title}: <span>{props.value}
        </span></div>
};

export default Display;