import { FC } from "react";
import classes from "./Posts.module.css";
import Post from "./Post/Post";
import { PostData } from "../../../types";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { deletePost, fetchGalleryData } from "../../../lib/axios/axiosGallery";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../../state/atoms/AppState";


const Posts: FC = () => {

  const token = useRecoilValue(tokenState);
  const queryClient = useQueryClient();

   const { data: posts, isLoading, isError } = useQuery(
     "galleryData",
     () => fetchGalleryData(token),
     {
      enabled: !!token,
     }
   );

   const mutation = useMutation(deletePost, {
     onSuccess: () => {
       queryClient.refetchQueries("galleryData");
     },
     onError: () => {
      // need add some error
     },
   });

   const onDelete = (postId: string) => {
     mutation.mutate(postId);
   };

  return (
    <div className={classes.posts}>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Oops! Something is broken :( </div>}
      {posts?.length === 0 && <div>Empty gallery</div>}
      {posts && (
        <ul className={classes.list}>
          {posts.map((post: PostData) => (
            <Post key={post.id} post={post} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}
export default Posts;