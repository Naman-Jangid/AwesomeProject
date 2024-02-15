import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuthStore} from '../../store/useAuthStore';
import {colors} from '../../utils/colors';
import IconButton from '../../components/Button';

const UserDetailsItem = ({label, value}: {label: string; value: string}) => (
  <View style={styles.itemContainer}>
    <Text style={styles.label}>{label}:</Text>
    <Text>{value}</Text>
  </View>
);
const DashBoard = () => {
  const {userDetails, logOutUser} = useAuthStore(state => state);
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: colors.defaultTheme,
          fontSize: 20,
          fontWeight: 700,
          marginVertical: 10,
        }}>
        Your Onboarding process has completed !
      </Text>
      <Text style={styles.title}>Your Details</Text>
      {Object.entries(userDetails).map(([key, value]) => (
        <UserDetailsItem key={key} label={key} value={value} />
      ))}
      <IconButton
        label="Logout"
        onPress={() => {
          !!logOutUser && logOutUser();
        }}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});
