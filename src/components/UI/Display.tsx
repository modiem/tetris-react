import classes from "./Display.module.css";
import React from "react"

type Props = {
    title: string,
    value: number,
}

const Display:React.FC<Props> = ({title, value}:Props) => {
    return <div className={classes.score}>{title}: <span>0</span></div>
};

export default Display;