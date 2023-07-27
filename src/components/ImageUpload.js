import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { db, storage } from "../firebase";
// import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {ref, getDownloadURL}  from "firebase/storage";
import { collection, serverTimestamp, addDoc} from 'firebase/firestore';
import {v4} from 'uuid';
import firebase from 'firebase/compat/app';
import "firebase/firestore";
import 'firebase/storage';

const ImageUpload = ({username}) => {
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState('')

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageURL: url,
                            userName: username
                        })
                    })

            }
        )
        setCaption(' ')
        setImage(null)
    };

    return(
        <div>
            <progress value={progress} max="100" />
            <input type="text" placeholder="Enter a caption" onChange={e => setCaption(e.target.value)} value={caption} />
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload;