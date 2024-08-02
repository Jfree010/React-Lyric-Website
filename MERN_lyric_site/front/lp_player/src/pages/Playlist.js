import PlaylistDesc from "../components/Playlist_components/PlaylistDesc"
import PlaylistTracks from "../components/Playlist_components/PlaylistTracks"
import { PlaylistContext } from "../context/PlaylistContext"
import { useLocation } from "react-router-dom"

const Playlist = () => {
    const location = useLocation()
    const { name, tracks, image, status } = location.state

    // console.log("play: ", tracks)

    return (
        <div className="playlist_box">
            <PlaylistContext.Provider value={{name, tracks, image, status}}>
                <PlaylistDesc/>
                <PlaylistTracks/>
            </PlaylistContext.Provider>
        </div>
    )
}

export default Playlist