import { useState, useRef, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import HomeList from "./HomeList"
import Symbols from "../Symbols"
import axios from 'axios'

const track_width = 210

const HomeSet = (props) => {
    const { label } = props
    const { user } = useAuthContext()
    const email = user ? user.email : ''

    // console.log("email: ", email)

    //Handle scroll
    const [scrollPosition, setScrollPosition] = useState(0)
    const ptrackRef = useRef()

    //Hot and Album sets
    const [album_names, set_album_names] = useState([])
    const [random_tracks, set_random_tracks] = useState([])

    //favorites and playlists
    const [fav, setFav] = useState([])
    const [all_playlists, set_all_playlist] = useState([])
    const [user_playlist, set_user_playlist] = useState([])

    const handleScroll = (scrollAmount) => {
        const newScrollPosition = Math.max(0, Math.min(scrollPosition + scrollAmount, ptrackRef.current.scrollWidth - ptrackRef.current.clientWidth));
        setScrollPosition(newScrollPosition);
        ptrackRef.current.scrollLeft = newScrollPosition;
    }


    useEffect(()=> {
        axios.get("http://localhost:5000/albums").then((res) => {
          set_album_names(res.data)
        })
    }, [])

    useEffect(()=> {
        axios.get(`http://localhost:5000/playlist`).then((res) => {
          set_all_playlist(res.data)
        })
    }, [])

    useEffect(()=> {
      if(email) {
        axios.get(`http://localhost:5000/user/${email}`).then((res) => {
          setFav(res.data.favorite)
          set_user_playlist(res.data.playlist)
        })
      }
    }, [email])

    useEffect(() => {
      axios.get("http://localhost:5000/songs")
        .then((res) => {
          const data = res.data;
          // Shuffle the array
          const shuffled = data.sort(() => 0.5 - Math.random());
          // Get the first 15 items
          const selected = shuffled.slice(0, 15);
          set_random_tracks(selected);
        })
        .catch((error) => {
          console.error("Error fetching songs:", error);
        });
    }, []);

    return (
        <div className="home_set">
            <h2>{label}</h2>
            <div className="home_set_scroll">
                <div className="home_set_buttons"><button onClick={() => handleScroll(-track_width)}><Symbols name="leftArrow"/></button></div>
                    {label === 'Hot' ? <div ref={ptrackRef} style={{overflowX:"scroll", scrollBehavior:"smooth", overflow:"hidden"}}className="home_set_track">
                    {random_tracks.map((track) => (   
                                <HomeList key={track._id} title={track.title} album={track.album} image={track.image} type="Hot"/>
                            ))}
                    </div> : ''}
                    {label === 'Albums' ? <div ref={ptrackRef} style={{overflowX:"scroll", scrollBehavior:"smooth", overflow:"hidden"}}className="home_set_track">
                        {album_names.map((album) => (   
                                <HomeList key={album._id} title={album.title} tracks={album.tracks} image={album.image} type="Album"/>
                            ))}
                    </div> : ''}
                    {label === 'Public Playlists' ? <div ref={ptrackRef} style={{overflowX:"scroll", scrollBehavior:"smooth", overflow:"hidden"}}className="home_set_track">
                        {all_playlists.map((list) => (   
                                <HomeList key={list._id} title={list.name} tracks={list.tracks} image={list.image} status={list.status} type="Playlist"/>
                            ))}
                    </div> : ''}
                    {label === 'Playlists' ? <div ref={ptrackRef} style={{overflowX:"scroll", scrollBehavior:"smooth", overflow:"hidden"}}className="home_set_track">
                        {user_playlist.map((list) => (   
                                <HomeList key={list._id} title={list.name} tracks={list.tracks} image={list.image} status={list.status} type="Playlist"/>
                            ))}
                    </div> : ''}
                    {label === 'Favorites' ? <div ref={ptrackRef} style={{overflowX:"scroll", scrollBehavior:"smooth", overflow:"hidden"}}className="home_set_track">
                
                        {fav.map((track) => (   
                            <HomeList key={track._id} title={track.title} album={track.album} image={track.image} type="Favorites"/>
                        ))}
                    </div> : ''}
                <div className="home_set_buttons"><button onClick={() => handleScroll(track_width)}><Symbols name="rightArrow"/></button></div>
            </div>
        </div>
    )
}

export default HomeSet