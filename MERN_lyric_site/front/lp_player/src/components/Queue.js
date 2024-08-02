import Symbols from "./Symbols"
import { useQueueContext } from "../hooks/useQueueContext"
import { useState, useEffect } from "react";
import QueueList from "./Queue_components/QueueList";
import { useNavigate } from 'react-router-dom';

const Queue = () => {
    const { queue, dispatch, playButtonToggle, setPlayButtonToggle, nonqueue_track } = useQueueContext();
    const [pickToggle, setPickToggle] = useState(2);
    let current_track = queue.name ? queue.current : nonqueue_track
    const [img_src, set_img_src] = useState("/../assets/images/atsimg.jpg")
    const [ scrolling_text, set_scrolling_text ] = useState("Nothing is currently playing...")
    const navigate = useNavigate();

    useEffect(() => {
        if (current_track && !queue.name) {
          set_img_src(current_track.image);
          set_scrolling_text(current_track.title)
        } else {
          set_img_src(queue.current.image);
          set_scrolling_text("Nothing is currently playing...")
        }
      }, [current_track, queue, set_img_src]);

    // console.log("current_track", current_track)
    const imgSrc = queue.name ? queue.current.image : img_src;

    const getPrevTrack = () => {
        if (!queue.tracks || queue.tracks.length === 0) return null;

        const currentTrack = queue.current;
        const tracks = queue.tracks;

        const currentIndex = tracks.findIndex(track => track.title === currentTrack.title);
        if (currentIndex === 0) return null
        const previousIndex = (currentIndex - 1);
        const previousTrack = tracks[previousIndex];

        return previousTrack;
    };

    const getNextTrack = () => {
        if (!queue.tracks || queue.tracks.length === 0) return null;

        const currentTrack = queue.current;
        const tracks = queue.tracks;

        const currentIndex = tracks.findIndex(track => track.title === currentTrack.title);
        const nextIndex = (currentIndex + 1);
        if(nextIndex >= tracks.length) return null
        const nextTrack = tracks[nextIndex];

        return nextTrack;
    };
    
    const prevTrack = getPrevTrack();
    const pTitle = prevTrack ? prevTrack.title : "No previous track"
    const nextTrack = getNextTrack();
    const nTitle = nextTrack ? nextTrack.title : "No next track"


    const handlePrev = () => {
        if (prevTrack) {
            localStorage.setItem('refresh', '1');
            dispatch({ type: 'UPDATE_CURRENT', payload: { current: prevTrack } });
            dispatch({ type: 'FETCH_QUEUE', payload: { ...queue, current: prevTrack } });
            navigate(`/tracklist/${prevTrack.album}/${prevTrack.title}`, { replace: true, state: { title: prevTrack.title } });
        }
    };

    const handleNext = () => {
        if (nextTrack) {
            localStorage.setItem('refresh', '1');
            dispatch({ type: 'UPDATE_CURRENT', payload: { current: nextTrack } });
            dispatch({ type: 'FETCH_QUEUE', payload: { ...queue, current: nextTrack } });
            navigate(`/tracklist/${nextTrack.album}/${nextTrack.title}`, { replace: true, state: { title: nextTrack.title } });
        }
    };

    const handlePlayToggle = () => {
        setPlayButtonToggle(!playButtonToggle)
    }

    const handlePlaylist = () => {
        if(pickToggle === 2) { //down
            setPickToggle(0) //up
        } else if(pickToggle === 1){//down
            setPickToggle(0)
        } else {
            setPickToggle(1)
        }
    };

    return (
        <div>
            <div className="queue_bar">
                <div className="queue_section queue_left">
                    <div className="queue_l">
                        <h3>{playButtonToggle ? "Now Playing" : "Queued"}</h3>
                        <div className="queue_l_img"><img src={imgSrc} alt="currently playing song"/></div>
                        <h3>:</h3>
                        <div className="queue_l_container">
                            <div className="queue_l_scrolling_text">
                                {queue.name ? queue.current.title : scrolling_text}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="queue_section queue_center">
                    <div className="queue_center_items">
                        <button className="queue_button" onClick={handlePrev} title={pTitle}><Symbols name="previous"/></button>
                        </div>
                    <button className="queue_button" onClick={handlePlayToggle} title={queue.current.title}>
                                {playButtonToggle ? <div className="qpause"><Symbols name="pause"/></div> : <div><Symbols name="play"/></div>}
                            </button>
                    <div className="queue_center_items">
                        <button className="queue_button" onClick={handleNext} title={nTitle}><Symbols name="next"/></button>
                    </div>
                </div>
                <div className="queue_section queue_right">
                    <button className="queue_button" onClick={handlePlaylist}>
                        {pickToggle === 0 ? <Symbols name="downArrow"/> :<Symbols name="upArrow"/>}
                    </button>
                </div>
            </div>
            <div><QueueList pickToggle={pickToggle}/></div>
        </div>
    )
}

export default Queue