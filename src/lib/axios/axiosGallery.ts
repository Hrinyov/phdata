import axios from "axios";
import { PostData } from "../../types";

export const fetchGalleryData = async ( token: string | null ) => {
  const response = await axios.get("http://localhost:8080/gallery", {
    headers: {
      "x-auth-token": token,
    },
  });
  const posts: PostData[] | undefined = response.data.posts;
  return posts;
};

export const addPost = async (formData: FormData, token: string) => {
  const response = await axios.post("http://localhost:8080/post", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
    "x-auth-token": token,
  },
});
  return response.status;
};

export const deletePost = async ( id: string ) => {
  const response = await axios.delete(`http://localhost:8080/gallery/${id}`);
        if(response.status === 200){
            return { success: true };
        }
};



