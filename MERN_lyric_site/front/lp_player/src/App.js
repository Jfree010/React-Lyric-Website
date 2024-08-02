import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from "./components/Navbar";
import Topbar from './components/Topbar';
import Search from './pages/Search';
import Track from "./pages/Track"
import SongPage from "./pages/SongPage";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Playlist from './pages/Playlist'
import { useAuthContext } from './hooks/useAuthContext';
import Queue from './components/Queue';

function App() {
  const { user } = useAuthContext()

  return (
    <Router>
      <div className='main_all'>
        <Topbar/>
        <div className='main_nav_routes'>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/playlist/:name" element={<Playlist/>}></Route>
            <Route path="/tracklist/:album/:title" element={<SongPage/>}></Route>
            <Route path="/tracklist/search" element={<Search/>}></Route>
            <Route path="/tracklist/all" element={<Track/>}></Route>
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>}></Route>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}></Route>
            <Route path="/profile" element={user ? <Profile/> : <Navigate to="/"/>}></Route>
            <Route path="/playlist/favorites" element={user ? <Playlist/> : <Navigate to="/"/>}></Route>
          </Routes>
        </div>
        <Queue/>
      </div>
    </Router>
  );
}

export default App;
