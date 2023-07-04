import './post.css';
import PostImage from '.\image\WhatsApp Image 2023-06-25 at 12.01.52.jpeg';
import Avatar from "@material-ui/core/Avatar"

const Post = ( { username, caption, imageUrl } ) => {
    return (
        <div className="post">
            <div className='post__header'>
                <Avatar
                    className='post__avatar'
                    alt='Davidakinola'
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>
            
            <img className="post__image" src={ imageUrl } />
            <h4 className="post__text" ><strong>{username}</strong>: {caption}</h4>
        </div>
    )
}
export default Post;