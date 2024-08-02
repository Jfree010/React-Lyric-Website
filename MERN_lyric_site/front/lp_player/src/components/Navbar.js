import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState, useEffect } from "react"
import axios from "axios"
import Symbols from "./Symbols"
import NavList from "./Navbar_components/NavList"

const Navbar = () => {
    const { user } = useAuthContext()
    const email = user ? user.email : ''
    const [fav, setFav] = useState([])
    const [all_playlists, set_all_playlist] = useState([])

    useEffect(()=> {
        if(email) {
          axios.get(`http://localhost:5000/user/${email}`).then((res) => {
            setFav(res.data.favorite)
            set_all_playlist(res.data.playlist)
          })
        }
      }, [email])

    return (
        <div>
            <nav className="nav g_verticalline_right">
                <div className="navbar_body">
                    <Link to="/" className="nav_link">
                        <div className="nav_link_body"><Symbols name="home"/><div className="nav_link_name">Home</div></div>
                    </Link>
                    <Link to="/tracklist/all" className="nav_link">
                        <div className="nav_link_body"><Symbols name="audio"/><div className="nav_link_name">All Tracks</div></div>
                    </Link>
                    <Link to={`/playlist/favorites`} state={{name: "Favorites", tracks: fav, image: "fav"}} className="nav_link">
                        <div className="nav_link_body"><Symbols name="favorites"/><div className="nav_link_name">Favorites</div></div>
                    </Link>
                    <h3 className="w_bottomline">Playlists</h3>
                    <div className="nav_scrollable">
                        {all_playlists.map((list)=>(
                            <NavList key={list._id} title={list.name} image={list.image} status={list.status} tracks={list.tracks}/>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar