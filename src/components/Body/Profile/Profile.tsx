import React, {useEffect, useState} from "react"
import Login from "../../Login/Login";
import useToken from "../../../hooks/use-token";
import axios from "axios";
import Posts from "./Posts/Posts";


const Profile: React.FC = () => {
    const [loginIsShow, setLoginIsShow] = useState(false);
    const {token, setToken} = useToken();
    const [posts, setPosts] = useState();

    useEffect(()=>{
        const init = async () =>{
        if(!token){
            return
        }
        if(token){
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
            if (response.status === 511) {
                setToken(null);
                setLoginIsShow(true);
            }    
            } catch (error) {
               console.error('Get posts failed')
            }    
        }  
        }
        init()
    },[]);


    const closeLogin =() =>{
        setLoginIsShow(false);
    }
    const logOutHandler = () => {
      setToken(null);
    };
    return (
        <>
            {loginIsShow && (
              <Login onClose={closeLogin} onSetToken={setToken} />
            )}
            {!token && (
              <>
                <h3>Please login</h3>
                <button onClick={() => setLoginIsShow(true)}>Login</button>
              </>
            )}
            {token && (
              <>
                <button onClick={logOutHandler}>Log out</button>
                <Posts posts={posts}/>
              </>
            )}
        </>
    );
}

export default Profile