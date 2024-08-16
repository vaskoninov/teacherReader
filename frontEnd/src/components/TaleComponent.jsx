import {Link} from "react-router-dom";

const TaleComponent = ({tale}) => {

    return (
        <>
            <li className="list-group-item list-group-item-action">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">{tale.title}
                            {tale.author ? ` - приказка от ${tale.author}` : null}
                        </h3>
                        <p className="card-text lead">{`${tale.text.substring(0, 100)} ...`}</p>
                        <Link to={`/${tale.slug}`} className="btn btn-primary">Започни да четеш</Link>
                    </div>
                </div>
            </li>
        </>
    )
}

export default TaleComponent;