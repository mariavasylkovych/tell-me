// import './App.css';
import { Route, Routes } from 'react-router';
import AnnounEdit from './components/AnnounEdit.jsx';
import CreateAnnouncement from './components/CreateAnnuncement.jsx';
import { CreatePost, GetPosts } from './components/index.js'
import Post from './components/Post.jsx';
import { Home, Login, Signup } from './pages'

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/create-announ' element={<CreateAnnouncement />} />
        <Route path='/post' element={<Post />} />
        <Route path='/edit-announ' element={<AnnounEdit />} />
      </Routes>
    </div>
  );
}

export default App;
