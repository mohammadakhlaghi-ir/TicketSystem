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
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
    alignItems: "center",
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
  table: {
    width: "100%",
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    padding: 10,
  },
  tableHeaderCell: {
    flex: 1,
    padding: 0,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  tableCellText: {
    flex: 1,
    padding: 8,
    color: "#000",
    fontSize: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  actionCell: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 2,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: "70%",
  },
  picker: {
    height: 50,
    width: "70%",
    marginBottom: 10,
  },
  mt1: {
    marginTop: 10,
  },
  m1:{
    margin:10
  },
  mb1:{
    marginBottom:10
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  pageNumber: {
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal:10
  },
});
