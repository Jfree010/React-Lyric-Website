import Symbols from "../Symbols"
import { Link } from "react-router-dom"

const NavList = (props) => {
    const { title, image, status, tracks } = props

    return (
        <div className="nav_list">
            <Link to={`/playlist/${title}`} state={{name: title, tracks: tracks, image: image, status: status}} className="globalLink">
                <div className="nav_list_symbol" title={status}>{status === "public" ? <Symbols name="globe"/> : <Symbols name="lock"/>}</div>
                <div className="nav_list_body" title={title}>{title}</div>
            </Link>
            
        </div>
    )
}

export default NavList