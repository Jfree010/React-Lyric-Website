import Symbols from "../Symbols"
import PlaylistPicks from "./PlaylistPicks"
import { useState } from "react"
import axios from "axios"

const PlaylistPicker = (props) => {
    const { playlists, email, title, pickToggle, setPickToggle } = props
    const [newToggle, setNewToggle] = useState(false)
    const [plName, setplName] = useState("")

    const handleClose = () => {
        setPickToggle(!pickToggle)
    }

    const handleNewToggle = () => {
        setNewToggle(!newToggle)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleNewPlaylist(plName)
        handleClose()
    }

    const handleNewPlaylist = (plName) => {
        const payload = JSON.stringify({name: plName, status: 'public'})
        const header = {headers: {'Content-Type': 'application/json'}}
        const endpoint = `http://localhost:5000/user/${email}/pcreate`
        axios.patch(endpoint, payload, header)
            .then(res => {
                console.log(`${plName} added`);
                window.location.reload(); // Reload the page after adding the playlist
            })
            .catch(err=> console.log(err))
    }


    return (
        <div className="overlay">
            <div className="playbox">
                <div>
                    <div className="playbox_head">
                        <h4>Add to/Remove from Playlist</h4>
                        <div className="playbox_center"><button title="Close" onClick={handleClose}><Symbols name="close"/></button></div>
                    </div>
                    <div className="playbox_scrollable">
                    {playlists.map((list) => (   
                        <PlaylistPicks key={list._id} name={list.name} email={email} title={title}
                        isIn={list.tracks.some(track => track.title === title) ? title : "null"}/>
                    ))}

                    </div>
                </div>
                <div className="playbox_new">
                    <div className="playbox_button"><button onClick={handleNewToggle}>Create New Playlist</button></div>
                    {newToggle ? <div>
                        <form onSubmit={handleSubmit}>
                            <input 
                            className="playbox_form"
                            type="text"
                            placeholder="Enter New Playlist Name..."
                            value={plName}
                            onChange={e=>setplName(e.target.value)}/>
                        </form>
                    </div> : ''}
                </div>
            </div>
        </div>
    )
}

export default PlaylistPicker