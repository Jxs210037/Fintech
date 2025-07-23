import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

export default function Header() {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row justify-between items-center mx-4 mt-4">
      <View>
        <Text
          className="text-2xl text-green-800 dark:text-white uppercase"
          style={{ fontFamily: "SpaceGroteskBold" }}
        >
          MarketPulse
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
        className="bg-gray-200 dark:bg-green-800 rounded-full p-2"
      >
        <MagnifyingGlassIcon
          size={25}
          strokeWidth={2}
          color={colorScheme === "dark" ? "white" : "green"}
        />
      </TouchableOpacity>
    </View>
  );
}
