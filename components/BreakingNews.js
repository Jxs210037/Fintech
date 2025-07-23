import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from 'expo-router';
import BreakingNewsCard from './BreakingNewsCard'; // ✅ Correct import

const { width } = Dimensions.get('window');

export default function BreakingNews({ data }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.push('NewsDetails', { item });
  };

  if (!data || data.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ textAlign: 'center' }}>No news to show</Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 16 }}>
      <Carousel
        loop
        autoPlay
        width={width * 0.8}
        height={200}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <BreakingNewsCard item={item} handleClick={handleClick} />
        )}
        style={{ alignSelf: 'center' }}
      />
    </View>
  );
}