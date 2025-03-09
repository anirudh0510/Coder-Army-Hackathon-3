import React from "react";
import "./Node.css";



function Node(props) {

    const width=Math.floor(((document.getElementById("test").clientWidth - 40))/39);
    const height=Math.floor(((document.getElementById("test").clientHeight - 45))/20);
 
    const { col, row, isStart, isFinish, isWall ,onMouseDown,onMouseEnter,onMouseUp} = props;
    const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : '';
    return <div
        style={{height:`${height}px`,width:`${width}px`}}
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={()=>onMouseDown(row,col)}
        onMouseEnter={()=>onMouseEnter(row,col)}
        onMouseUp={()=>onMouseUp()}>

    </div>
}

export default Node;