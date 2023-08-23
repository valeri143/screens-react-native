import { Post } from "../Post/Post";
import { ScrollView } from "react-native";

export const PostsList = ({ posts, allComments }) => {
  return (
    <ScrollView>
      {posts.map(({ data, id }) => {
        const { postName, postLocation, takenPhotoUri, location } = data;
        const commentsForPost = allComments?.filter(
          (comment) =>
            comment.data.currentPost.data.takenPhotoUri === takenPhotoUri
        );

        const commentsCount = commentsForPost?.length;

        return (
          <Post
            key={id}
            postName={postName}
            takenPhotoUri={takenPhotoUri}
            postLocation={postLocation}
            location={location}
            commentsCount={commentsCount}
          />
        );
      })}
    </ScrollView>
  );
};
