import React, { useState, useEffect} from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Navbar1 = () => {
  const navigation = useNavigation();
  const [selectedIcon, setSelectedIcon] = useState('home'); // Set 'home' as the default selected icon
  const [transactionCount, setTransactionCount] = useState(5); // Example transaction count
  const [transactions, setTransactions] = useState(0);

  const iconData = [
    { name: 'heart', color: '#000', screenName: 'note', label: 'note' },
    //{ name: 'home', color: '#000', screenName: 'HomeCompany', label: 'home' },
    { name: 'bar-chart-2', color: '#000', screenName: 'Statistic', label: 'statistique' },
  ];

  useEffect(() => {
    axios
      .get("https://xnova-back-end-dgb2.onrender.com/api/user/countTransaction")
      .then((response) => {
        setTransactions(response.data.Transactions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleIconPress = (iconName, screenName) => {
    setSelectedIcon(iconName === selectedIcon ? null : iconName); // Toggle selection
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {iconData.map((icon) => (
        <TouchableOpacity
          key={icon.name}
          style={styles.iconContainer}
          onPress={() => handleIconPress(icon.name, icon.screenName)}
        >
          <View>
            <Feather
              name={icon.name}
              size={30}
              color={selectedIcon === icon.name ? '#fff' : icon.color}
            />
            {selectedIcon === icon.name && (
              <Text style={styles.iconText}>{icon.label}</Text>
            )}
            {icon.name === 'home' && transactions > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{transactions}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 110, 195, 0.7)',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 8,
    left: 7,
    right: 7,
    borderRadius: 20,
    height: 65,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  iconText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
    marginTop: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: -12,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Navbar1;
