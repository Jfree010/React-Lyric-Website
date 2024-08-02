import HomeSet from "../components/Home_components/HomeSet"

const Home = () => {

    return (
        <div className="home">
            
            <div className="home_body_scrollable">
                <HomeSet label="Hot"/>
                <HomeSet label="Albums"/>
                <HomeSet label="Public Playlists"/>
            </div>
        </div>
    )
}

export default Home