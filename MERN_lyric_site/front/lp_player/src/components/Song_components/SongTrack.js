import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SongContext } from '../../context/SongContext';
import { useQueueContext } from '../../hooks/useQueueContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import Youtube from 'react-youtube';
import Symbols from '../Symbols';
import ColorPicker from '../SongTrack_components/ColorPicker';
import AnimationPicker from '../SongTrack_components/AnimationPicker';
import PlaylistPicker from '../SongTrack_components/PlaylistPicker';


const SongTrack = () => {
    const {currentTime, setCurrentTime, lyrics, setPrimaryIndex, ttitle, mLink, vLink, karaoke, setKaraoke, setSubArray, setsubIndex} = useContext(SongContext)
    const { queue, dispatch, playButtonToggle, setPlayButtonToggle, set_nonqueue_track } = useQueueContext()
    const navigate = useNavigate();
    const { user } = useAuthContext()


    useEffect(() => {
        if(!queue.name) {
            axios.get(`http://localhost:5000/songs/${ttitle}`).then((res) => {
                set_nonqueue_track(res.data)
            })
        } 

    }, [ttitle, queue.name, set_nonqueue_track])

    //for music player
    const playerRef = useRef(null);
    const [boxLink, setBoxLink] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [swButton, setSwButton] = useState('video');
    const [isPlaying, setIsPlaying] = useState(false);
    
    //for text color and animation selection
    const [colorBox, setColorBox] = useState(false)
    const [textAnimation, setTextAnimation] = useState(false)

    //for adding to favorites and playlists
    const email = user ? user.email : ''
    const [toggleFav, setToggleFav] = useState(false)
    const [togglePlaylist, setTogglePlaylist] = useState(false)
    const [all_playlists, set_all_playlists] = useState([])

    useEffect(()=> {
        if (email) {
            axios.get(`http://localhost:5000/user/${email}`).then((res) => {
                const favorites = res.data.favorite;
                const isFavorite = favorites.some(f => f.title === ttitle);
                setToggleFav(isFavorite);
                set_all_playlists(res.data.playlist)
            }).catch(error => {
                console.error('Error fetching user favorites:', error);
            });
        }
    }, [email, ttitle])

    //load page with audio ready
    useEffect(() => {
        if (!initialized && mLink) {
        setBoxLink(mLink);
        setInitialized(true);
        }
    }, [mLink, initialized]);

    //determine which line is being play and whether it's a background or lead vocal
    useEffect(() => {
        if (isPlaying) {
        const intervalId = setInterval(() => {
            if (playerRef.current) {
            setCurrentTime(playerRef.current.getCurrentTime());
            const i = lyrics.findIndex(number => number.end[number.end.length - 1] > currentTime && number.begin[0] < currentTime);
            if (i > -1) {
                const j = lyrics[i].end.findIndex(number => number > currentTime);
                if (lyrics[i].overlapped !== 2) {
                if (lyrics[i].overlapped === 1) {
                    setSubArray(lyrics[i].overlap);
                } else {
                    setSubArray({});
                }
                }
                setPrimaryIndex(i);
                setsubIndex(j);
            } else {
                // Reset states when no object satisfies the condition
                setSubArray({});
                setPrimaryIndex(-1);
                setsubIndex(-1);
            }
            }
        }, 50);
        return () => clearInterval(intervalId);
        }
    }, [isPlaying, setCurrentTime, lyrics, playerRef, currentTime, setSubArray, setPrimaryIndex, setsubIndex]);

    //Swap between music audio and video
    const trackBox = () => {
        let nextButton = 'music';
        let nextLink = mLink;
        if(swButton === 'music') {
        nextButton = 'video'
        nextLink = mLink
        } else if (swButton === 'video' && karaoke === false) {
        nextButton = 'music'
        nextLink = vLink
        setKaraoke(false)
        } else { //in karaoke mode and presses video => button text goes to music, youtube goes to video, and singmode turns off
        nextButton = 'music'
        nextLink = vLink
        setKaraoke(false)
        }
        setSwButton(nextButton);
        setBoxLink(nextLink);
    };

    //Enter and Exit Sing-a-long Mode
    const karaokeBox = () => {
        setBoxLink(mLink);
        setSwButton('video');
        const isKaraoke = karaoke === false ? true : false;
        setKaraoke(isKaraoke);
        if (isKaraoke && !isPlaying) {
            setIsPlaying(true)
            playerRef.current.playVideo()
        } 
    }

    //Handling playback status
    const handlePlay = () => {
        setIsPlaying(true);
        setPlayButtonToggle(true)
    };
    const handlePause = () => {
        setIsPlaying(false)
        setPlayButtonToggle(false)
    };
    const handleReady = (event) => {playerRef.current = event.target}

    useEffect(() => {
        if (playButtonToggle && playerRef.current) {
          playerRef.current.playVideo();
        } else if (!playButtonToggle && playerRef.current) {
          playerRef.current.pauseVideo();
        }
    }, [playButtonToggle]);

    //If there is an active queue, go to next track in queue once song ends
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

    const handleQueueNext = () => {
        const nextTrack = getNextTrack();
        if (nextTrack) {
            localStorage.setItem('refresh', '1');
            dispatch({ type: 'UPDATE_CURRENT', payload: { current: nextTrack } });
            dispatch({ type: 'FETCH_QUEUE', payload: { ...queue, current: nextTrack } });
            navigate(`/tracklist/${nextTrack.album}/${nextTrack.title}`, { replace: true, state: { title: nextTrack.title } });
        }
    }

    //Handling Color selection
    const handleColor = () => {
        setColorBox(!colorBox)
        setTextAnimation(false)
        setTogglePlaylist(false)
    }

    //Handling animation selection
    const handleText = () => {
        setTextAnimation(!textAnimation)
        setColorBox(false)
        setTogglePlaylist(false)
    }

    //Adding or removing a track from favorites
    const updateFav = (choice) => {
        const payload = JSON.stringify({ s_title: ttitle });
        const header = {headers: {'Content-Type': 'application/json'}}
        const endpoint = choice 
            ? `http://localhost:5000/user/${email}/add` 
            : `http://localhost:5000/user/${email}/delete`;
        axios.patch(endpoint, payload, header)
          .then(console.log(`${ttitle} added/removed`))
          .catch(err => console.log(err))
      }

    const handleFav = () => {
        if(!toggleFav) {
          //add track to favorites
          updateFav(true)
        } else {
          //remove track from favorites
          updateFav(false)
        }
        setToggleFav(!toggleFav)
      }

    //Handling adding and removing tracks from playlist
    const handlePlaylist = () => {
        setTogglePlaylist(!togglePlaylist)
        setColorBox(false)
        setTextAnimation(false)
      }

    return (
        <div className='song_track'>
            {initialized ? (<Youtube videoId={boxLink} onReady={handleReady} onPlay={handlePlay} onPause={handlePause} onEnd={handleQueueNext}/>) : ''}
            <div className='song_track_buttons'>
            <span><button title={swButton === 'video' ? 'video' : 'music'} onClick={trackBox}>
            {swButton === 'video' ? <Symbols name="video"/> : <Symbols name="audio"/>}</button></span>
            <span className={karaoke ? 'singmode' : ''}><button title='sing-a-long mode' onClick={karaokeBox}><Symbols name="karaoke"/></button></span>
            <span className={textAnimation ? 'singmode' : ''}><button title='Change text animation' onClick={handleText}><Symbols name="animation"/></button></span>
            <span className={colorBox ? 'singmode' : ''}><button title='Change text animation colors' onClick={handleColor}><Symbols name="color"/></button></span>
            <span className={toggleFav ? 'singmode' : ''}><button title={toggleFav ? 'Remove from favorites' : 'Add to Favorites'} onClick={handleFav}>{toggleFav ? <Symbols name="favorite_minus"/> : <Symbols name="favorite"/>}</button></span>
            <span className={togglePlaylist ? 'singmode' : ''}><button title='Add to playlist' onClick={handlePlaylist}><Symbols name="playlist"/></button></span>
            </div>
            <div>{colorBox ? (<ColorPicker/> ) : ''}</div>
            <div> {textAnimation ? ( <AnimationPicker/>) : ''}</div>
            <div>{togglePlaylist ? (<PlaylistPicker playlists={all_playlists} email={email} title={ttitle} pickToggle={togglePlaylist} setPickToggle={setTogglePlaylist}/>) : ''}</div>
        </div>
    )
}

export default SongTrack