import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const ServiceBox1 = ({ serviceLabel, serviceImage, onPress }) => {
  const boxSize = windowWidth * 0.50; // Adjust the percentage as needed for the desired box size

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { width: boxSize, height: boxSize, borderRadius: boxSize / 2 }]}>
        <Image
          source={serviceImage}
          style={styles.image}
        />
        <Text style={styles.label}>{serviceLabel}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  image: {
    width: "70%", // Adjust the percentage as needed for the desired image size
    height: "70%", // Adjust the percentage as needed for the desired image size
    aspectRatio: 1, // Ensure the image maintains its aspect ratio (square)
    borderRadius: 40,
  },
  label: {
    marginTop: 0,
    textAlign: "center",
    color: "#246EC3",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ServiceBox1;
