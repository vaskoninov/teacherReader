import {useEffect, useState} from "react";
import * as services from "../services/services.js";
import TaleComponent from "./TaleComponent.jsx";

const TaleList = ({tales}) => {


    return (
        <div>
            <h1>Налични приказки</h1>
            <ul className="list-group">
                {tales.map(tale => {
                    return <TaleComponent key={tale.id} tale={tale} />
                })}
            </ul>
        </div>
    )
}

export default TaleList