import { useState, useEffect  } from 'react';
import './App.css';
import Post from './components/post';
import NavBar from './components/navbar';
import PostImage from '.\image\WhatsApp Image 2023-06-25 at 12.01.52.jpeg';
import { db } from './firebase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@material-ui/core';

function App() {
  const [ posts, setPosts ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // it runs a piece of code based on a specific condition [useEffect]
  useEffect(()=> {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc =>({ 
        id: doc.id,
        post: doc.data()
        })));
    })
  }, [])

  const signUp = (event) => {

  }

  return (
    <div className="app">
      <NavBar/>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <form>
            <center>
              <img
                className='app__headerImage'
                src="https://www.instargram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="instagram logo"
              />
            </center>
            <Input
                placeholder={'Username'}
                type={"text"}
                vaule={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder={'Email'}
                type={"text"}
                vaule={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder={'Password'}
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </form>
        </Box>
      </Modal>
      <Button onClick={signUp} > Sign Up </Button>
      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
    </div>
  );
}

export default App;
