import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerBackground: {
    flex: 1,
  },
  containerComments: {
    marginBottom: 31,
  },
  inputContainer: {
    position: "absolute",
    bottom: 16,
    left: 24,
  },
  input: {
    width: 343,
    height: 50,
    borderWidth: 1,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 50,
    paddingTop: 16,
  },
  inputFocused: {
    borderColor: "#FF6C00",
  },
  textAccent: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    paddingHorizontal: 7,
    paddingVertical: 6,
  },
  inputComment: {
    position: "relative",
    marginBottom: 16,
  },
});
