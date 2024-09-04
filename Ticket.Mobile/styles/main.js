import { StyleSheet } from "react-native";
import colors from "./colors";

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
    padding: 5,
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
    padding: 5,
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
  m1: {
    margin: 10,
  },
  mb1: {
    marginBottom: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  pageNumber: {
    textAlign: "center",
    alignSelf: "center",
    marginHorizontal: 10,
  },
  buttonDanger: {
    backgroundColor: colors.danger,
    borderRadius: 2,
    padding: 5,
  },
  buttonText: {
    color: "white",
    textAlign:'center'
  },
  buttonPrimary:{
    backgroundColor: colors.primary,
    borderRadius: 2,
    padding: 5,
  },
  messagesContainer: {
    marginTop: 8,
  },
  message: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.grey,
    backgroundColor:'white',
    borderRadius:5,
    width:'50%',
  },
  messageContent: {
    fontSize: 16,
  },
  messageTimestamp: {
    fontSize: 12,
  },
  messageUser: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  ticketTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign:'center'
  },
  ticketHeader: {
    marginBottom: 16,
  },
  ticketCategory: {
    fontSize: 18,
    textAlign:'center'
  },
  ticketContainer: {
    padding: 16,
    flex:1
  },
  adminMessage:{
    marginLeft: '50%',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.grey,
    paddingVertical: 16,
    paddingHorizontal: 8,
    },
  textarea: {
    height: 100,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    margin: 8,
    textAlignVertical: 'top',
    backgroundColor: 'white',

  },
  buttonContainerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticketScroll:{
    height:'45%'
  },
  headerButton:{
    flexDirection:'row',
  },
  reloadText:{
    marginHorizontal:10
  },
  homeStyle:{
    margin:10,
  },
  homeTitle:{
    fontWeight:'bold',
    marginVertical:10
  }
});
