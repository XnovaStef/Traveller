import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable"; // Import the Animatable library

const windowWidth = Dimensions.get("window").width;

const ServiceBox = ({ serviceLabel, serviceImage, onPress }) => {
  const boxSize = windowWidth * 0.32;

  return (
    <TouchableOpacity onPress={onPress}>
      <Animatable.View // Wrap the container with Animatable.View
        animation="zoomIn" // Apply zooming entrance animation
        duration={3000} // Animation duration in milliseconds
        style={[styles.container, { width: boxSize, height: boxSize }]}
      >
        <Image source={serviceImage} style={styles.image} />
        <Text style={styles.label}>{serviceLabel}</Text>
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
});

export default ServiceBox;
