import React, { useRef, useEffect } from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(moveAnim, {
        duration: 2000,
        toValue: Dimensions.get('window').width / 1.6,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(moveAnim, {
        duration: 2000,
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
    ]).start();
    Animated.timing(fadeAnim, {
      duration: 2000,
      toValue: 1,
      delay: 2000,
      useNativeDriver: false,
    }).start(() => {
        // Navigate to the next screen after the animation is complete
        navigation.replace('welcome');
      });
  }, [moveAnim, fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Animated.Image
          style={[styles.image, { opacity: fadeAnim }]}
          source={require('../assets/images/logo4.png')}
        />
        <Animated.View style={[styles.logoContainer, { marginLeft: moveAnim }]}>
          <Text style={[styles.logoText]}>T</Text>
          <Animated.Text style={[styles.logoText, { opacity: fadeAnim }]}>
            raveller
          </Animated.Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#246EC3',
  },
  logoText: {
    fontSize: 35,
    marginTop: 20,
    color: 'white',
    fontWeight: '700',
  },
  contentContainer: {
    top: '30%',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    flexDirection: 'row',
  },
});

export default SplashScreen;
