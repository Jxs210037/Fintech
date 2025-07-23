import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen() {
  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@yourapp.com?subject=Help%20Request');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons name="help-circle-outline" size={60} color="#555" style={styles.icon} />
      <Text style={styles.header}>Need Help?</Text>
      <Text style={styles.subtext}>Here are some quick answers and ways to reach us.</Text>

      <View style={styles.faqSection}>
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>

        <View style={styles.questionBlock}>
          <Text style={styles.question}>• How do I reset my password?</Text>
          <Text style={styles.answer}>You can reset your password by going to the login screen and tapping “Forgot Password.”</Text>
        </View>

        <View style={styles.questionBlock}>
          <Text style={styles.question}>• How do I change my phone number?</Text>
          <Text style={styles.answer}>Navigate to Settings in Account to update your phone number.</Text>
        </View>

        <View style={styles.questionBlock}>
          <Text style={styles.question}>• Is my data secure?</Text>
          <Text style={styles.answer}>Yes. We use end-to-end encryption and never share your data.</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.contactButton} onPress={handleEmailSupport}>
        <Ionicons name="mail" size={22} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.contactText}>Contact Support</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  faqSection: {
    width: '100%',
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  questionBlock: {
    marginBottom: 16,
  },
  question: {
    fontWeight: '600',
    marginBottom: 4,
  },
  answer: {
    color: '#555',
    fontSize: 15,
  },
  contactButton: {
    marginTop: 40,
    backgroundColor: '#2f95dc',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
