import {useEffect, useState} from 'react'

import './App.css'
import TaleList from "./components/TalesList.jsx";
import * as services from "./services/services.js";

function App() {

    const [tales, setTales] = useState([])

    useEffect(() => {
        services.getTales()
            .then(data => setTales(data))
            .catch(error => console.log(error))
    }, []);


    return (


        <TaleList tales={tales}/>


    )
}

export default App
