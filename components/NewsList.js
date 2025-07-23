import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function NewsList({ data, handlePress }) {
  const renderItem = ({ item }) => {
    if (!item?.image) return null;

    return (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        style={styles.card}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>
            {item.title?.length > 80 ? item.title.slice(0, 77) + '...' : item.title}
          </Text>
          <Text style={styles.source}>{item.source?.name || 'News'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.url + index}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  source: {
    fontSize: 12,
    color: 'gray',
  },
});
