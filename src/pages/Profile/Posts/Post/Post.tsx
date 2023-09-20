import React from "react";
import Classes from "./Post.module.css";
import axios from "axios";
import { PostData } from "../../../../types";

interface PostProps {
    post: PostData;
    onRefresh: () => void;
}

const Post: React.FC<PostProps> = ({post, onRefresh}) => {
    
    const downloadHandler = (imageUrl: string) =>{
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "info.jpg";
        link.click();
    }

    const deleteHandler = async (id: string) =>{
        const response = await axios.delete(`http://localhost:8080/gallery/${id}`);
        if(response.status === 200){
            console.log('Deleted')
            onRefresh();
        }
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