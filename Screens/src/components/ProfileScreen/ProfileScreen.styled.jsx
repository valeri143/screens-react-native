import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageContainer: {
    position: "absolute",
    left: 128,
    top: -60,
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  imageAdd: {
    position: "absolute",
    top: 21,
    right: 130,
  },
  text: {
    fontSize: 30,
    marginBottom: 32,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
