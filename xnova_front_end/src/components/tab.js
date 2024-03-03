import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();
  const [selectedIcon, setSelectedIcon] = useState('home'); // Set 'home' as the default selected icon

  const iconData = [
    { name: 'file-text', color: '#000', screenName: 'Pass', label: 'Ticket' },
    { name: 'home', color: '#000', screenName: 'Reservation', label: 'Services' },
    { name: 'user', color: '#000', screenName: 'Profil', label: 'profil' },
  ];

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
    backgroundColor: '#246EC3',
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
});

export default Navbar;
