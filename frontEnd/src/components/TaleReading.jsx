import {useParams} from "react-router-dom";
import {useTales} from "./TaleContext.jsx";
import {useEffect, useState} from "react";
import {toggleRecognition, readWord} from '../services/speechRecognition.js'
import WordOnFocus from "./wordOnFocus.jsx";
import TaleHeader from "./TaleHeader.jsx";
import TaleNavigation from "./TaleNavigation.jsx";


const TaleReading = () => {
    const {slug} = useParams()
    const {tales} = useTales()
    const [index, setIndex] = useState(0)
    const [isEnabled, setIsEnabled] = useState(true)

    const tale = tales.find(tale => tale.slug === slug)

    if (!tale) {
        return <div>Tale not found or still loading...</div>;
    }

    const words = tale.text.split(' ').map(word => word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))
    const word = words[index]

    function nextWord() {
        if (index < words.length - 1) {
            setIndex(prevIndex => prevIndex + 1);
            setIsEnabled(true)
        } else {
            console.log("No more words to display");
        }
    }

    function previousWord() {
        if (index > 0) {
            setIndex(prevIndex => prevIndex - 1)
            // return word
        }
    }

    async function handleToggleRecognition() {
        const isCorrect = await toggleRecognition()
        setIsEnabled(!isCorrect)
    }

    return (
        <div className="container-fluid">
            <div className="row text-center align-items-center">
                <TaleNavigation direction={"previous"} onClick={previousWord} label={"Предишна дума"} />

                <div className="col-md-6 mb-3 mb-md-0">
                    <div className="card">
                        <TaleHeader title={tale.title}/>
                        <div className="card-body">
                            <WordOnFocus word={word}/>
                            <p id="recognized-text"></p>
                            <div className="row gap-2">
                                <button className="btn btn-primary" id="speech-btn" onClick={handleToggleRecognition}>
                                    Започни да четеш
                                </button>
                                <button className="btn btn-secondary" id="reading-btn" onClick={readWord}>
                                    Прочети вместо мен
                                </button>
                                <audio id="audio-player" controls style={{display: "none"}}>
                                    <source src="" type="audio/mpeg"/>
                                </audio>
                            </div>
                        </div>
                    </div>
                </div>
                <TaleNavigation direction={"next"} onClick={nextWord} label={"Следваща дума"} disabled={isEnabled}/>

            </div>
        </div>
    )
}

export default TaleReading