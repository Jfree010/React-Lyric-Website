import { useQueueContext } from "../../hooks/useQueueContext"
import QueueListMap from "./QueueListMap"

const QueueList = (props) => {
    const { queue, dispatch } = useQueueContext()
    const { pickToggle } = props

    // console.log("queuelist: ", queue)

    const handleClearQueue = () => {
        const emptyName = ''
        const emptyList = []
        const emptyObject = {}
        const queuePayload = {emptyName, emptyList, emptyObject}
        dispatch({ type: 'CLEAR_QUEUE', payload: queuePayload });
    }

    const handleToggle = () => {
        if (pickToggle === 0) {
            return "queue_list_raise queue_list"
        } else if (pickToggle === 1) {
            return 'queue_list queue_list_lower'
        } else {
            return 'queue_list'
        }
    }

    return (
        <div className={handleToggle()}>
            <div className="queue_list_box">
                <div className="queue_list_head w_bottomline">
                    <h1>{queue.name}</h1>
                    <button onClick={handleClearQueue}>Clear Queue</button>
                </div>
                <div className="queuelist_body bottom">
                    {queue.name ? 
                        <div className="queue_scrollable">
                            {queue.tracks.map((track) => (
                                <QueueListMap key={track._id} title={track.title} album={track.album} image={track.image} track={track} />
                            ))}
                        </div> : "Not currently listening to anything"}
                </div>
            </div>
        </div>
    )
}

export default QueueList