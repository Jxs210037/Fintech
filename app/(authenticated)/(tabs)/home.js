import React, { useRef } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';

// Components
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import MiniHeader from '@/components/MiniHeader';
import BreakingNews from '@/components/BreakingNews';
import NewsList from '@/components/NewsList';
import { useNavigation } from 'expo-router';

export default function Home() {
  const colorScheme = useColorScheme();
  const searchInput = useRef(null);
  const navigation = useNavigation();

  // 🔑 Insert your GNews API key directly here for testing
  const API_KEY = '2104303b374e3d449f0c5bc629400c3c'; // ← Replace this

  // 🚀 Fetch business news (for the carousel)
  const fetchBreakingNews = async () => {
    const res = await fetch(
      `https://gnews.io/api/v4/top-headlines?topic=business&lang=en&country=us&max=10&token=${API_KEY}`
    );
    const data = await res.json();
    console.log('📡 Breaking News:', data.articles);
    return data.articles || [];
  };

  // 🚀 Fetch technology news (for the scrollable list)
  const fetchRecommendedNews = async () => {
    const res = await fetch(
      `https://gnews.io/api/v4/top-headlines?topic=technology&lang=en&country=us&max=10&token=${API_KEY}`
    );
    const data = await res.json();
    console.log('📡 Recommended News:', data.articles);
    return data.articles || [];
  };

  // 🧠 useQuery handles fetching and caching
  const {
    data: breakingNews = [],
    isLoading: isBreakingNewsLoading,
  } = useQuery({
    queryKey: ['breakingNews'],
    queryFn: fetchBreakingNews,
  });

  const {
    data: recommendedNews = [],
    isLoading: isRecommendedNewsLoading,
  } = useQuery({
    queryKey: ['recommendedNews'],
    queryFn: fetchRecommendedNews,
  });

  const handleNewsPress = (item) => {
    navigation.push('NewsDetails', { item });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Header />

      {(isBreakingNewsLoading || isRecommendedNewsLoading) ? (
        <Loading />
      ) : (
        <ScrollView>
          <MiniHeader label="Breaking News" />
          <BreakingNews data={breakingNews} />

          <MiniHeader label="Top Stories" />
          <NewsList data={recommendedNews} handlePress={handleNewsPress} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
