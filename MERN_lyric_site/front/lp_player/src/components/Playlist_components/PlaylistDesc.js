import { useContext } from "react"
import { PlaylistContext } from "../../context/PlaylistContext"
import Symbols from "../Symbols"

const PlaylistDesc = () => {
    // let image_fav = "/../assets/images/Favorite.jpg"
    const { image } = useContext(PlaylistContext)

    return (
        <div className="playlist_desc_box g_verticalline_right">
            {image === "fav" ? <div><Symbols name="favorites_large" /></div> :
           <Symbols name="music_note" />}
            <div className="playlist_desc_text playlist_desc_text_scrollable">
                <h4>Description: </h4>
            Lorem ipsum dolor sit amet. Et accusamus consequuntur qui reiciendis asperiores eos omnis odio et quia nesciunt ut optio quisquam sit dolorem enim cum corrupti sapiente. Ut sequi modi aut eaque explicabo qui natus commodi aut consequuntur doloremque et beatae autem
            Qui dolores natus sit sint quaerat ea nihil culpa id quas velit eum optio minima et accusamus nostrum rem voluptas dicta! Sed dignissimos unde et autem itaque a minima omnis sed itaque expedita At error dolorum.
            Qui saepe odio rem asperiores placeat non odio cupiditate non galisum quibusdam est aliquam unde! Est praesentium animi vel similique galisum id aliquid corrupti a iure blanditiis id pariatur quibusdam. Et repudiandae ducimus ut nesciunt facilis est nemo nostrum et neque reprehenderit aut praesentium omnis et ipsa dolorem.

                </div>
        </div>
    )
}

export default PlaylistDesc