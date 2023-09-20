import React from "react";
import classes from "./Posts.module.css";
import Post from "./Post/Post";
import { PostData } from "../../../types";

interface PostsProps {
    posts: PostData[] | undefined;
    onRefresh: () => void;
}

const Posts: React.FC<PostsProps> = ({posts, onRefresh}) =>{

  const emptyMessage = <li key='1'>Empty gallery</li>;
  
  console.log(posts);
  let displayPosts = posts
    ? posts.map((post: PostData) => <Post key={post.id} post={post} onRefresh={onRefresh}/>)
    : emptyMessage;

  if(posts?.length === 0 ){
    displayPosts = emptyMessage
  }

  return (<div className={classes.posts}>
    {posts && <ul className={classes.list}>{displayPosts}</ul>}
    
  </div>);
}
export default Posts;