import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { PlaylistContext } from "../../context/PlaylistContext"
import { useQueueContext } from "../../hooks/useQueueContext"
import PlaylistTrackMapper from "./PlaylistTrackMapper"
import PlaylistDropDown from "./PlaylistDropDown";

const PlaylistTracks = () => {
    const { name, tracks, status} = useContext(PlaylistContext)
    let { dispatch } = useQueueContext()
    const navigate = useNavigate();

    console.log("playlisttracks status:", status)

    const handleQueue = () => {
        // Ensure tracks array is not empty
        if (tracks && tracks.length > 0) {
          const current = tracks[0]
          const queuePayload = { name, tracks, current };
          dispatch({ type: 'FETCH_QUEUE', payload: queuePayload });
          const album = current.album;
          const title = current.title;
    
          // Use absolute path for navigation
          navigate(`/tracklist/${album}/${title}`, { replace: true, state: { title } });
        } else {
          console.error("Tracks array is empty or undefined.");
        }
      };

    return (
        <div className="playlist_track">
            <div className="playlist_track_head">
                <h1>{name}</h1>
                <button onClick={handleQueue}>Play all</button>
                {status ? <PlaylistDropDown name={name} status={status}/> : ''}
            </div>
            <div className="playlist_track_scrollable bottom">
              {tracks.length === 0 ? (
                  <h3>Playlist is empty...</h3>
              ) : (
                  tracks.map((track) => (
                      <PlaylistTrackMapper key={track._id} title={track.title} album={track.album} image={track.image}/>
                  ))
              )}
          </div>
        </div>
    )
}

export default PlaylistTracks