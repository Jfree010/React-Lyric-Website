import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState } from "react"

const PlaylistDropDown = (props) => {
    const { name, status } = props
    const [stat, set_stat] = useState(status)
    const { user } = useAuthContext()
    const email = user ? user.email : ''

    const handleStatus = (current_status) => {
        set_stat(current_status)
        // let n_stat = stat === true ? 'public' : 'private'
        const payload = JSON.stringify({name: name, new_status: current_status})
        const header = {headers: {'Content-Type': 'application/json'}}
        const endpoint = `http://localhost:5000/user/${email}/statuschange`
        axios.patch(endpoint, payload, header)
            .then(res => {
                console.log(`${name} deleted`)
                window.location.reload(); 
            })
            .catch(err=> console.log(err))
      }

    return (
        <div className="search_dropdown">

            <button className="search_dropbtn">
                {stat}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"/>
                </svg>
            </button>
            <div className="search_dropdown_content">
                <span><button onClick={()=>handleStatus("public")}>Public</button></span>
                <span><button onClick={()=>handleStatus("private")}>Private</button></span>
            </div>
        </div>
    )
}

export default PlaylistDropDown