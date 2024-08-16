
import TaleComponent from "./TaleComponent.jsx";
import {useTales} from "./TaleContext.jsx";


const TaleList = () => {
    const {tales} = useTales()

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