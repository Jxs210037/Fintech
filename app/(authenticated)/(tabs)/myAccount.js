import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

import RoundBtn from '@/components/RoundBtn';
import WidgetList from '@/components/SortableList/WidgetList';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useBalanceStore } from '@/store/balanceStore';

const Page = () => {
  const [amountInput, setAmountInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();
  const headerHeight = useHeaderHeight();

  const getFontSize = (amount) => {
    const length = amount.toFixed(2).length;
    if (length <= 7) return 50;
    if (length <= 10) return 42;
    return 34;
  };

  const handleAddMoneyPress = () => {
    setShowInput((prev) => !prev);
  };

  const onAddMoney = () => {
    const parsedAmount = parseFloat(amountInput);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid number greater than 0');
      return;
    }

    runTransaction({
      id: Math.random().toString(),
      amount: parseFloat(parsedAmount.toFixed(2)),
      date: new Date(),
      title: 'Added money',
    });

    setAmountInput('');
    setShowInput(false);
  };

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      {/* Account Balance */}
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={[styles.balance, { fontSize: getFontSize(balance()) }]}>
            ${balance().toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            defaultStyles.pillButtonSmall,
            { backgroundColor: Colors.lightGray, marginVertical: 20 },
          ]}
        >
          <Text style={[defaultStyles.buttonTextSmall, { color: Colors.dark }]}>Accounts</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionRow}>
        <RoundBtn icon="add" text="Add money" onPress={handleAddMoneyPress} />
        <RoundBtn icon="refresh" text="Clear" onPress={clearTransactions} />
        <RoundBtn icon="list" text="Details" />
      </View>

      {/* USD Input Field */}
      {showInput && (
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            value={amountInput}
            onChangeText={setAmountInput}
            placeholder="Enter amount in USD"
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderColor: Colors.gray,
              borderRadius: 10,
              padding: 14,
              marginBottom: 10,
              backgroundColor: '#fff',
            }}
          />
          <TouchableOpacity
            onPress={onAddMoney}
            style={[
              defaultStyles.pillButton,
              { marginBottom: 20, backgroundColor: Colors.primary },
            ]}
          >
            <Text style={defaultStyles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Transactions List */}
      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        {transactions.length === 0 ? (
          <Text style={{ padding: 14, color: Colors.gray }}>No transactions yet</Text>
        ) : (
          transactions.map((transaction) => (
            <View
              key={transaction.id}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}
            >
              <View style={styles.circle}>
                <Ionicons
                  name={transaction.amount > 0 ? 'add' : 'remove'}
                  size={24}
                  color={Colors.dark}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '400' }}>{transaction.title}</Text>
                <Text style={{ color: Colors.gray, fontSize: 12 }}>
                  {format(new Date(transaction.date), 'MMM d, yyyy p')}
                </Text>
              </View>
              <Text>${transaction.amount.toFixed(2)}</Text>
            </View>
          ))
        )}
      </View>

      {/* Widgets */}
      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
  },
  balance: {
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Page;
