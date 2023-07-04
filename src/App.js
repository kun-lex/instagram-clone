import { useState } from 'react';
import './App.css';
import Post from './components/post';
import NavBar from './components/navbar';
import PostImage from '.\image\WhatsApp Image 2023-06-25 at 12.01.52.jpeg';

function App() {
  const [ posts, setPosts ] = useState([
    {
      username: "",
      caption: "",
      imageUrl: ""
    },
    {
      username: "",
      caption: "",
      imageUrl: ""
    },
  ]);
  return (
    <div className="app">
      <NavBar/>
      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
    </div>
  );
}

export default App;
