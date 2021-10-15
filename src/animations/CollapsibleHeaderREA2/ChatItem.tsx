import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ChatItemProps = {
  index: number;
  data: {
    key: string;
    name: string;
    message: string;
  };
};

const ChatItem = ({ index, data }: ChatItemProps): JSX.Element => {
  return (
    <View style={[styles.chatContainer, index === 0 ? { borderWidth: 2 } : {}]}>
      <Text style={styles.chatUser}>{data.name}</Text>
      <Text>{data.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    margin: 10,
    padding: 10,
  },
  chatUser: {
    fontSize: 17,
    fontWeight: '600',
  },
});

export default ChatItem;
