import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { colors } from "../../utils/colors";

const UserDetailsItem = ({ label, value }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.label}>{label}:</Text>
    <Text>{value}</Text>
  </View>
);
const DashBoard = () => {
  const {userDetails} = useAuthStore(state => state);
  return (
    <View style={styles.container}>

    <Text style={{color:colors.defaultTheme, fontSize:20, fontWeight:700, marginVertical:10}}>Your Onboarding process has completed !</Text>
    <Text style={styles.title}>Your Details</Text>

    {Object.entries(userDetails).map(([key, value]) => (
      <UserDetailsItem key={key} label={key} value={value} />
    ))}
  </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
});
