import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical:10,
    alignItems:"center"
  },
  buttonContainer:{
    marginHorizontal:10,
  }
});
