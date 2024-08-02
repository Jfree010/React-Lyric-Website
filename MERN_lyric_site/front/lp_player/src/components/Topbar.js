import Searchbar from "./Search_components/Searchbar"
import Symbols from "./Symbols"
import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const Topbar = () => {
    const { user } = useAuthContext()

    return (
        <div className="topbar">
            <div className="topbar_head g_verticalline_right">
                <div className="topbar_head_icon">
                    {user ? <Link to="/profile" className="globalLink" title="profile page"><Symbols name="profile"/></Link> :
                    <Link to="/login" className="globalLink" title="login"><Symbols name="profile"/></Link>}
                    </div>
            </div>
            <div className="topbar_search"><Searchbar/></div>
        </div>
    )
}

export default Topbar