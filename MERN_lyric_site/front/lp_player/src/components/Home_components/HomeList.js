import { Link } from "react-router-dom"

const HomeList = (props) => {
    const {title, image, album, type, status, tracks} = props

    return (
        <div className="home_list">
            {type === "Album" ? <div>
                <Link to={`/playlist/${title}`} state={{name: title, tracks: tracks, image: image}} className="globalLink">
                        <img src={image} alt={title}/>
                        <h5>{title}</h5>
                    </Link>
            </div> : ""}
            { type === "All Tracks" ? <div>
            <Link to={`/tracklist/${album}/${title}`} state={{title: title}} className="globalLink">
                <img src={image} alt={title}/>
                <h5>{title}</h5>
            </Link>
            </div> : ""}
            { type === "Hot" ? <div>
            <Link to={`/tracklist/${album}/${title}`} state={{title: title}} className="globalLink">
                <img src={image} alt={title}/>
                <h5>{title}</h5>
            </Link>
            </div> : ""}
            {type === "Playlist" ? <div>
                <Link to={`/playlist/${title}`} state={{name: title, tracks: tracks, image: image, status: status}} className="globalLink">
                    <img src={image} alt={title}/>
                    <h5>{title} · {status}</h5>
                </Link>
            </div> : ""}
            {type === "Favorites" ? <div>
                <Link to={`/tracklist/${album}/${title}`} state={{title: title}} className="globalLink">
                    <img src={image} alt={title}/>
                    <h5>{title}</h5>
                </Link>
            </div> : ""}
        </div>
    )
}

export default HomeList