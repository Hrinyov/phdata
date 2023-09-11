import React from "react";
import classes from "./Posts.module.css"
import Post from "./Post/Post";

interface PostsProps{
    posts: any;
}

const Posts: React.FC<PostsProps> = ({posts}) =>{
console.log(posts)

  const emptyMessage = <li key='1'>Empty gallery</li>;
  if(posts){
    
  }
  let displayPosts = posts ? posts.map((post:any) =>(
   <Post post={post}/>
  )) : emptyMessage;
if(posts && posts.length === 0 ){
    displayPosts = emptyMessage
}

  return <div className={classes.posts}>
    {posts && <ul className={classes.list}>{displayPosts}</ul>}
    
  </div>;
}
export default Posts;