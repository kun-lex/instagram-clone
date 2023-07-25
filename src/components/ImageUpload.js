import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { collection, serverTimestamp, addDoc} from 'firebase/firestore';
import {v4} from 'uuid';
import "firebase/firestore";
import 'firebase/storage';

const ImageUpload = ({username}) => {
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState('')
    const imageRef = ref(storage, "images/")

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (image == null) return;
        const upLoadTask = ref(storage,`images/${image.name + v4()}`);
        uploadBytes(upLoadTask, image).then(() => {
            alert(" Upload sucessful.....");
        })

        // upLoadTask.on( 
        //     "state_changed",
        //     (snapshot) => {
        //         const progress = Math.round(
        //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //         );
        //         setProgress(progress);
        //     },
        //     (error) => {
        //         console.log(error);
        //         alert(error.message);
        //     },
        //     () => {
                
        //     }
        // )
        setCaption(' ')
        setImage(null)
    }
    useEffect(() => {
        listAll(imageRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    
                    collection(db, "posts")(addDoc, {
                        timestamp: serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username,
                    })
                })
            });
        })
    })

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