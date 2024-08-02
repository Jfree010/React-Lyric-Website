import Symbols from "../Symbols"
import axios from "axios"
import { useState } from 'react'

const PlaylistPicks = (props) => {
    const { name, title, email, isIn } = props
    console.log("title: ", title)
    const t = isIn !== 'null' ? true : false
    const [isChecked, setIsChecked] = useState(t)
    // console.log(`${name} start: ${t}`)

    const handleDeletePlaylist = () => {
        const payload = JSON.stringify({name: name, status: 'public'})
        const header = {headers: {'Content-Type': 'application/json'}}
        const endpoint = `http://localhost:5000/user/${email}/pdelete`
        axios.patch(endpoint, payload, header)
            .then(res => {
                console.log(`${name} deleted`)
                window.location.reload(); // Reload the page after deletion
            })
            .catch(err=> console.log(err))
    }

    const handleAddDelete = () => {
        const newIsChecked = !isChecked;
        setIsChecked(newIsChecked);
    
        const payload = JSON.stringify({ name, title });
        const header = { headers: { 'Content-Type': 'application/json' } };
        const endpoint = `http://localhost:5000/user/${email}/p${newIsChecked ? 'add' : 'remove'}`;
    
        axios.patch(endpoint, payload, header)
            .then(res => {
                console.log(`${title} ${newIsChecked ? 'added to' : 'removed from'} ${name}`);
                window.location.reload(); // Reload the page after the operation
            })
            .catch(err => console.log(err));
    };
    
    
    return (
        <div className="playbox_picks bottomline">
            <div className="playbox_pick_choice">
                <div className="playbox_center"><button onClick={handleDeletePlaylist} title="Delete Playlist"><Symbols name="close"/></button></div>
                <h4>{name}</h4>
            </div>
            <div><input type="checkbox" checked={isChecked} onChange={handleAddDelete}/></div>
        </div>
    )
}

export default PlaylistPicks