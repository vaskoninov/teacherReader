const TaleComponent = ({tale}) => {

    return (
        <>
            <li className="list-group-item list-group-item-action">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">{tale.title}
                            {`- приказка от ${tale.author}` ? tale.author : null}
                        </h3>
                        <p className="card-text lead">{`${tale.text.substring(0, 100)} ...`}</p>

                    </div>
                </div>
            </li>
        </>
    )
}

export default TaleComponent;