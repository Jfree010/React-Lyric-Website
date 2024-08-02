import { useNavigate } from 'react-router-dom';

const PlaylistTrackMapper = (props) => {
    const { title, album, image } = props;
    const navigate = useNavigate();

    const handleClick = (event) => {
        localStorage.setItem('refresh', '1');
        navigate(`/tracklist/${album}/${title}`, { state: { title: title } });
    };

    return (
        <div className='playlist_track_mapper'>
            <div onClick={handleClick} className="globalLink">
                <div className='playlist_track_mapper_box'>
                    <img src={image} alt={title}/>
                    <h4>{title}</h4>
                </div>
            </div>
        </div>
    )
}

export default PlaylistTrackMapper