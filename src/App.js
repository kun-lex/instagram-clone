import { useState, useEffect  } from 'react';
import './App.css';
import Post from './components/post';
import NavBar from './components/navbar';
import { db , auth } from './firebase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input } from '@material-ui/core';
import { signOut, signInWithEmailAndPassword } from 'firebase/auth';
import ImageUpload from './components/ImageUpload';
import { collection, onSnapshot, orderBy } from 'firebase/firestore';

function App() {
  const [ posts, setPosts ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] =useState(false)

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
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
            setUser(authUser);
        } else {
            setUser(null);
        }
    });

    return () => {
        unsubscribe();
    };
}, [user, username]);



  const signUp = (e) => {
    e.preventDefault();

    auth
    .createUserWithEmailAndPassword( email, password)
    .then((authUser) =>{
      return authUser.user.updateProfile({
        displayName: username,
      })
    }).catch((error) => alert(error.message ))

    setOpen(false)
  }

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .catch((error) => alert(error.message ))

    setOpenSignIn(false);
  }
    // it runs a piece of code based on a specific condition [useEffect]
  useEffect(() => 
    onSnapshot(collection(db, "posts"), (snapshot) =>
    setPosts (snapshot.docs.map ((doc) => ({ ...doc.data(), id: doc.id, post: doc.data()}) )) 
    )
, []);

  return (
    <div className="app">
      <NavBar/>
      {user && user.displayName ? (
        <ImageUpload username={user.displayName} />
      ): (
        <h3>Please Login</h3>
      )}
      
      <Modal
        open={open}
        onClose={handleClose}
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
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
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
              <Button type='submit' onClick={signUp} > Sign Up </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={setOpenSignIn}
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
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="instagram logo"
              />
            </center>
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
              <Button type='submit' onClick={signIn} > Sign In </Button>
          </form>
        </Box>
      </Modal>
      {user ? (
        <Button onClick={ () => signOut(auth)} >Log out</Button>
      ): (
        <div className='app__loginContainer' >
          <Button onClick={setOpenSignIn} >Sign in</Button>
          <Button onClick={handleOpen} >Sign Up</Button>
        </div>
      )}
      
      {
        posts.map((id, post) => (
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
    </div>
  );
}

export default App;
