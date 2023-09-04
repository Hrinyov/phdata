import React, {useState} from "react"
import Login from "../../Login/Login";
import useToken from "../../../hooks/use-token";


const Profile: React.FC = () => {
    const [loginIsShow, setLoginIsShow] = useState(false);
    const {token, setToken} = useToken();

    const closeLogin =() =>{
        setLoginIsShow(false);
    }

    if(true) {
        return <>
        {loginIsShow && <Login onClose={closeLogin} onSetToken={setToken}/> }
        <h3>Please login</h3>
        <button onClick={()=>setLoginIsShow(true)}>Login</button>
        </>
    }

    return <div>
        <h2>Profile component</h2>
    </div>
}

export default Profile