import { FC } from "react";
import Posts from "./Posts/Posts";
import LoginAndRegister from "./LoginAndRegister/LoginAndRegister";
import { tokenState } from "../../state/atoms/AppState";
import { useRecoilState } from "recoil";
import { useQueryClient } from "react-query";

const Profile: FC = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const queryClient = useQueryClient();

  const logout = () => {
    setToken(null);
    queryClient.invalidateQueries("galleryData");
  };
  
  return (
   <>
      {!token ? (
        <LoginAndRegister />
      ) : (
        <>
          <button onClick={logout}>Log out</button>
          <Posts />
        </>
      )}
    </>
  );
};

export default Profile;
