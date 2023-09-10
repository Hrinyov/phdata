import React, {useState} from "react"
import Login from "../../Login/Login";
import useToken from "../../../hooks/use-token";


const Profile: React.FC = () => {
    const [loginIsShow, setLoginIsShow] = useState(false);
    const {token, setToken} = useToken();

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
                <h2>Photo gallery</h2>
                <span>some data</span>
              </>
            )}
        </>
    );
}

export default Profile