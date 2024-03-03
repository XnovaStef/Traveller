import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { BlurView } from 'expo-blur';
import * as Animatable from "react-native-animatable";

const windowWidth = Dimensions.get("window").width;

const ServiceBox = ({ serviceLabel, serviceImage, onPress, disabled }) => {
  const boxSize = windowWidth * 0.32;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Animatable.View
        animation="zoomIn"
        duration={3000}
        style={[
          styles.container,
          { width: boxSize, height: boxSize },
          disabled && styles.disabledContainer,
        ]}
      >
        {disabled ? (
          <BlurView
            style={styles.image}
            intensity={5} // Adjust intensity as needed
            tint="light" // Adjust tint as needed
          >
            <Image source={serviceImage} style={styles.image} />
          </BlurView>
        ) : (
          <Image source={serviceImage} style={styles.image} />
        )}
        <Text style={[styles.label, disabled && styles.disabledLabel]}>
          {serviceLabel}
        </Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  disabledContainer: {
    backgroundColor: "#ccc", // Change the background color to indicate disabled state
  },
  image: {
    height: "80%",
    aspectRatio: 1,
    borderRadius: 10,
  },
  label: {
    marginTop: 0,
    textAlign: "center",
    color: "#246EC3",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledLabel: {
    color: "#888", // Change the text color to indicate disabled state
  },
});

export default ServiceBox;
