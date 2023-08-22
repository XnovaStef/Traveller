import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const CompagnieBox = ({ compagnieLabel, compagnieImage, onPress }) => {
  const boxSize = windowWidth * 0.32; // Adjust the percentage as needed for the desired box size

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { width: boxSize, height: boxSize }]}>
        <Image
          source={compagnieImage}
          style={styles.image}
        />
        <Text style={styles.label}>{compagnieLabel}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#246EC3",
    marginVertical: 10,
    borderRadius: 50, // Make the container circular by setting the borderRadius to half of the width
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 5,
    
    
  },
  image: {
    height: "30%", // Adjust the percentage as needed for the desired image size
    aspectRatio: 1, // Ensure the image maintains its aspect ratio (square)
    borderRadius: 50, // Make the image circular by setting the borderRadius to half of the width
  },
  label: {
    marginTop: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CompagnieBox;
