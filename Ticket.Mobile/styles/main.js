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
    padding:10
  },
  tableHeaderCell: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  tableCellText: {
    flex: 1,
    padding: 20,
    color: "#000",
    fontSize: 16,
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
});
