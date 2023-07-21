import { Button } from "@material-ui/core";
import { useState } from "react";
import { db, storage } from "../firebase";
import { onSnapshot, collection } from 'firebase/firestore'
import '../firebase'

const ImageUpload = () => {
    const [image, setImage] = useState(null)
    const [progress, setProgres] = useState(0)
    const [caption, setCaption] = useState('')

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = ({username}) => {
        const upLoadTask = storage.ref(`image/${image.name}`).put(image)
        upLoadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgres(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadUrl()
                    .then(url => {
                        collection(db, "posts").add({
                            // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username,
                        })
                    })
            }
        )
    }

    return(
        <div>
            <input type="text" placeholder="Enter a caption" onChange={e => setCaption(e.target.value)} value={caption} />
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload;