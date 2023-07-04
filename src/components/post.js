import './post.css'
import PostImage from '.\image\WhatsApp Image 2023-06-25 at 12.01.52.jpeg'

const Post = () => {
    return (
        <div className="post">
            <h3>Username</h3>
            <img className="post__image" src={ PostImage } />
            <h4 className="post__text" ><strong>devDavid</strong>: Let's go!</h4>
        </div>
    )
}
export default Post;