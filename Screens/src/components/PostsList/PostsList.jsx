import { Post } from "../Post/Post";
import { ScrollView } from "react-native";

export const PostsList = ({ posts }) => {
  const commentsCount = 1;
  return (
    <ScrollView>
      {posts.map(({ data, id }) => {
        const { postName, postLocation, takenPhotoUri, location } = data;
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
