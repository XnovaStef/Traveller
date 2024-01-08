import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Lottie from 'lottie-react-native';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import * as Animatable from 'react-native-animatable';

export default function RatingScreen() {
  const navigation = useNavigation();
  const [punctualityRating, setPunctualityRating] = useState(0);
  const [comfortRating, setComfortRating] = useState(0);
  const [serviceQualityRating, setServiceQualityRating] = useState(0);

  const handlePunctualityRating = (rating) => {
    setPunctualityRating(rating);
    this.punctualityRef.bounceIn(800);
  };

  const handleComfortRating = (rating) => {
    setComfortRating(rating);
    this.comfortRef.bounceIn(800);
  };

  const handleServiceQualityRating = (rating) => {
    setServiceQualityRating(rating);
    this.serviceQualityRef.bounceIn(800);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar style='dark' />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 30,
          left: 20,
          padding: 10,
        }}
      >
        <Icon name="arrow-back" size={30} color="#246EC3" />
      </TouchableOpacity>
      <View style={{ marginBottom: 20 }}>
        <Text>Note de Ponctualité :</Text>
        <Animatable.View ref={(ref) => (this.punctualityRef = ref)}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={punctualityRating}
            selectedStar={(rating) => handlePunctualityRating(rating)}
            starSize={30}
            starColor="#246EC3" // Définit la couleur des étoiles
          />
        </Animatable.View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text>Note de Confort :</Text>
        <Animatable.View ref={(ref) => (this.comfortRef = ref)}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={comfortRating}
            selectedStar={(rating) => handleComfortRating(rating)}
            starSize={30}
            starColor="#246EC3" // Définit la couleur des étoiles
          />
        </Animatable.View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text>Note de Qualité du Service :</Text>
        <Animatable.View ref={(ref) => (this.serviceQualityRef = ref)}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={serviceQualityRating}
            selectedStar={(rating) => handleServiceQualityRating(rating)}
            starSize={30}
            starColor="#246EC3" // Définit la couleur des étoiles
          />
        </Animatable.View>
      </View>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 300, height: 300 }}>
        <Lottie source={require('../assets/images/unvailable.json')} autoPlay loop />
      </View>
      <Text>Service bientôt disponible</Text>
    </View>
  );
}
