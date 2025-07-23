import { useAuth, useUser } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getAppIcon, setAppIcon } from 'expo-dynamic-app-icon';

import Colors from '@/constants/Colors';

const ICONS = [
  { name: 'Default', icon: require('@/assets/images/icon.png') },
  { name: 'Dark', icon: require('@/assets/images/icon-dark.png') },
  { name: 'Vivid', icon: require('@/assets/images/icon-vivid.png') },
];

const Page = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [edit, setEdit] = useState(false);
  const [activeIcon, setActiveIcon] = useState('Default');

  useEffect(() => {
    const fetchIcon = async () => {
      try {
        const icon = await getAppIcon();
        setActiveIcon(icon ?? 'Default');
      } catch (err) {
        console.warn('Error getting app icon:', err);
      }
    };

    fetchIcon();
  }, []);

  const handleSave = async () => {
    try {
      if (!user) return;
      await user.update({ firstName, lastName });
    } catch (err) {
      console.error('Failed to update user:', err);
    } finally {
      setEdit(false);
    }
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled && result.assets[0]?.base64) {
      try {
        await user?.setProfileImage({
          file: `data:image/png;base64,${result.assets[0].base64}`,
        });
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    }
  };

  const handleChangeAppIcon = async (iconName) => {
    try {
      await setAppIcon(iconName.toLowerCase());
      setActiveIcon(iconName);
    } catch (err) {
      console.warn('Error changing app icon:', err);
    }
  };

  return (
    <BlurView intensity={80} tint="dark" style={styles.container}>
      <View style={styles.centered}>
        <TouchableOpacity onPress={handleImagePick} style={styles.captureBtn}>
          {user?.imageUrl && (
            <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
          )}
        </TouchableOpacity>

        <View style={styles.editRow}>
          {!edit ? (
            <>
              <Text style={styles.nameText}>
                {firstName} {lastName}
              </Text>
              <TouchableOpacity onPress={() => setEdit(true)}>
                <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.inputField}
              />
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={styles.inputField}
              />
              <TouchableOpacity onPress={handleSave}>
                <Ionicons name="checkmark-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <ActionButton icon="log-out" label="Log out" onPress={signOut} />
        <ActionButton icon="person" label="Account" />
        <ActionButton icon="bulb" label="Learn" />
        <ActionButton icon="megaphone" label="Inbox" badge="14" />
      </View>

      {Platform.OS === 'ios' && (
        <View style={styles.actions}>
          {ICONS.map((icon) => (
            <TouchableOpacity
              key={icon.name}
              style={styles.btn}
              onPress={() => handleChangeAppIcon(icon.name)}
            >
              <Image source={icon.icon} style={styles.iconImg} />
              <Text style={styles.btnText}>{icon.name}</Text>
              {activeIcon.toLowerCase() === icon.name.toLowerCase() && (
                <Ionicons name="checkmark" size={24} color="#fff" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </BlurView>
  );
};

const ActionButton = ({ icon, label, onPress, badge }) => (
  <TouchableOpacity style={styles.btn} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#fff" />
    <Text style={styles.btnText}>{label}</Text>
    {badge && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centered: {
    alignItems: 'center',
  },
  editRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  nameText: {
    fontSize: 26,
    color: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
  },
  captureBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    width: 140,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  actions: {
    backgroundColor: 'rgba(256, 256, 256, 0.1)',
    borderRadius: 16,
    margin: 20,
  },
  btn: {
    padding: 14,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
  },
  iconImg: {
    width: 24,
    height: 24,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default Page;
