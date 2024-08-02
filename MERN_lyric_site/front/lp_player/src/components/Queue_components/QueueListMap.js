import { Link } from 'react-router-dom'
import { useQueueContext } from '../../hooks/useQueueContext';

const QueueListMap = (props) => {
    const { title, album, image, track } = props
    const { queue, dispatch } = useQueueContext()

    const handleClick = () => {
        localStorage.setItem('refresh', '1');
        dispatch({ type: 'UPDATE_CURRENT', payload: { current: track } });
        dispatch({ type: 'FETCH_QUEUE', payload: { ...queue, current: track } });
      };

    return (
        <div className='queue_list_map'>
            <Link to={`tracklist/${album}/${title}`} state={{title: title}} className='globalLink' onClick={handleClick}>
                <div className='search_list_link'>
                    <img src={image} alt="album name"/>
                    <div className='search_list_title'>
                        {title}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default QueueListMap