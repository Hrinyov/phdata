import React, {useEffect, useState} from "react"
import useToken from "../../../hooks/use-token";
import axios from "axios";
import Posts from "./Posts/Posts";
import LoginAndRegister from "./LoginAndRegister/LoginAndRegister";


const Profile: React.FC = () => {
    const {token, setToken} = useToken();
    const [posts, setPosts] = useState();

    useEffect(()=>{
        getGallery();
    },[token]);

    const getGallery = async ()=> {
       if (!token) {
         return;
       }
       if (token) {
         try {
           const response = await axios.get("http://localhost:8080/gallery", {
             headers: {
               "x-auth-token": token,
             },
           });
           if (response.status === 200) {
             const { posts } = response.data;
             setPosts(posts);
           }
         } catch (error: any) {
           console.error("Get posts failed");
           if (error.response.status === 401) {
             setToken(null);
           }
         }
       }
    }

    const refresh = () =>{
      getGallery();
    }

    const logOutHandler = () => {
      setToken(null);
    };

    return (
        <>
            {!token && (
              <LoginAndRegister onSetToken={setToken}/>
            )}
            {token && (
              <>
                <button onClick={logOutHandler}>Log out</button>
                <Posts posts={posts} onRefresh={refresh}/>
              </>
            )}
        </>
    );
}

export default Profile;