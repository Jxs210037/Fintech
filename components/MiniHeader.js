import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function MiniHeader({ label }) {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <Text style={styles.viewAllText}>View All</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // px-4
    marginVertical: 16,    // my-4
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 20, // text-xl
    color: '#065f46', // text-green-800
    fontFamily: 'TimesNewRoman',
  },
  viewAllText: {
    fontSize: 16, // text-base
    color: '#4b5563', // text-gray-600
    fontFamily: 'TimesNewRoman',
  },
});
