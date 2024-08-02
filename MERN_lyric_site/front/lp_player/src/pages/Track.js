import axios from "axios"
import { useEffect, useState } from "react"
import HomeList from "../components/Home_components/HomeList"

const Track = () => {
    const [all_tracks, set_all_tracks] = useState([])

    useEffect(()=> {
        axios.get("http://localhost:5000/songs").then((res) => {
          set_all_tracks(res.data)
        })
      }, [])

    return (
        <div>
            <h1>All Tracks</h1>
            <div className="track_list track_list_scrollable">
                { all_tracks.map((track) => (
                    <HomeList key={track._id} title={track.title} album={track.album} image={track.image} type="All Tracks"/>
                ))}
            </div>
        </div>
    )
}

export default Track