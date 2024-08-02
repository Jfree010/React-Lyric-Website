import SongTrack from "../components/Song_components/SongTrack"
import SongLyrics from "../components/Song_components/SongLyrics"
import { SongContext } from '../context/SongContext'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from "axios"

const SongPage = () => {
    const location = useLocation()
    const { title } = location.state

    const [track_info, set_track_info] = useState([])
    const [currentTime, setCurrentTime] = useState(0)
    const [primaryIndex, setPrimaryIndex] = useState(-1) //index of line for primary animation (lead vocals)
    const [subArray, setSubArray] = useState({}) //array of lines for the secondary index (back up vocals)
    const [karaoke, setKaraoke] = useState(false)
    const [lyrics, set_lyrics] = useState([])
    const [subIndex, setsubIndex] = useState(-1) //index of line for secondary animation (back up vocals)

    const [primAnimation, setPrimAnimation] = useState('highlight')
    const [secAnimation, setSecAnimation] = useState('text-wipe')
    const [primColor, setPrimColor] = useState('#FFFF00')
    const [secColor, setSecColor] = useState('#4248f5')
    const [selectedColor, setSelectedColor] = useState('p')

    //refresh page for queuing
    const refreshValue = localStorage.getItem('refresh') || '0';

    const refreshPage = () => {
      localStorage.setItem('refresh', '0'); // Reset refresh to 0
      window.location.reload(); // Reload the page
    };

    useEffect(() => {
      if (refreshValue === '1') {
          refreshPage();
      }
    }, [refreshValue]);

    useEffect(() => {
        const fetchTrackInfo = async () => {
            try {
            const response = await axios.get(`http://localhost:5000/songs/${title}`);
            set_track_info(response.data);
            } catch (error) {
            // Handle error (e.g., set an error state)
            console.error('Error fetching track info:', error);
            }
        };
        
        fetchTrackInfo();
        }, [title]);

    useEffect(() => {
        const fetchLyrics = async () => {
            try {
            const response = await axios.get(`http://localhost:5000/kTracks/${title}`);
            if (response.data.length > 0) {
                set_lyrics(response.data[0].tracks);
            } else {
                // Handle case where no data is returned
                set_lyrics([]); // or set to an appropriate default value
            }
            } catch (error) {
            // Handle error (e.g., set an error state)
            console.error('Error fetching lyrics:', error);
            }
        };
        
        fetchLyrics();
        }, [title]);

    const mLink = track_info.musicLink
    const vLink = track_info.videoLink
    const ttitle = track_info.title
    const tlink = track_info.trackLink

    return (
        <div className="song_page">
            <SongContext.Provider value={{currentTime, setCurrentTime, lyrics, primaryIndex, setPrimaryIndex, 
        mLink, vLink, karaoke, setKaraoke, tlink, ttitle, subArray, setSubArray, subIndex, setsubIndex,
        primAnimation, setPrimAnimation, secAnimation, setSecAnimation, primColor, setPrimColor, secColor, setSecColor,
        selectedColor, setSelectedColor}}>
                <SongTrack/>
                <SongLyrics/>
            </SongContext.Provider>
        </div>
    )
}

export default SongPage