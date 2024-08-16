import {createContext, useContext, useEffect, useState} from "react";
import * as services from "../services/services.js";


const TaleContext = createContext();

export const TaleProvider = ({children}) => {
    const [tales, setTales] = useState([])

    useEffect(() => {
        services.getTales()
            .then(data => setTales(data))
            .catch(error => console.log(error))
    }, []);

    return (
        <TaleContext.Provider value={{tales}}>
            {children}
        </TaleContext.Provider>
    )
}

export const useTales = () => {
    return useContext(TaleContext)
}