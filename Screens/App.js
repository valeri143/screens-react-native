
import { StyleSheet, Text, View } from 'react-native';
import { PostsScreen } from './src/components/PostsScreen/PostsScreen';

export default function App() {
  return (
 <View style={styles.container} >
      <PostsScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
