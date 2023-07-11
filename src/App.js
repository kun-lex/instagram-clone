import { useState, useEffect  } from 'react';
import './App.css';
import Post from './components/post';
import NavBar from './components/navbar';
import { db , auth } from './firebase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input } from '@material-ui/core';
import { onSnapshot, collection } from 'firebase/firestore'

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

  // useEffect(() =>{
  //   auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {

  //     } else {

  //     }
  //   })
  // }, []);

  // it runs a piece of code based on a specific condition [useEffect]
  useEffect(()=> {
    onSnapshot(collection(db, "posts"), (snapshot) =>{
      setPosts(snapshot.docs.map((doc) => doc.data() ))
    } )
  }, [])

  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWihtEmailAndPassword(email, password)
    .catch((error) => alert(error.message ))
  }

  return (
    <div className="app">
      <NavBar/>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <form
            style={{
              display:'flex',
              flexDirection: 'column',
            }}
          >
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
      <Button type='submit' onClick={signUp} > Sign Up </Button>
      {
        posts.map(({post}) => (
          <Post  username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
    </div>
  );
}

export default App;
