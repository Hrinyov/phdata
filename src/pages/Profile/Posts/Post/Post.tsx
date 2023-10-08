import { FC } from "react";
import Classes from "./Post.module.css";
import { PostData } from "../../../../types";

interface PostProps {
    post: PostData;
    onDelete: (postId: string) => void;
}

const Post: FC<PostProps> = ({ post, onDelete }) => {
    
    const downloadHandler = (imageUrl: string) =>{
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "info.jpg";
        link.click();
    }

    const deleteHandler = async (id: string) =>{
        onDelete(id)
    }
    
    return (<li className={Classes['card-container']}>
        <div className={Classes.card}>
        <img src={post.imageUrl} alt='image'/>
        <div><strong>Description:</strong> {post.description ? post.description : 'empty'}</div>
        <button onClick={()=>downloadHandler(post.imageUrl)}>Download</button>
        <button onClick={()=>deleteHandler(post.id)}>Delete</button>   
        </div>
    </li>);
}

export default Post;