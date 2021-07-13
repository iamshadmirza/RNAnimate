import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { RootStackParamList } from './types/RootNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

type Animation = {
  path: keyof RootStackParamList;
  title: string;
};

const animations: Array<Animation> = [
  {
    path: 'ToggleBar',
    title: 'Toggle Bar (Docs example)',
  },
];

const AnimationListing = ({ navigation }: Props): JSX.Element => (
  <FlatList
    data={animations}
    keyExtractor={(item, index) => item.path + index}
    contentContainerStyle={styles.container}
    renderItem={({ item }) => (
      <Pressable style={styles.card} onPress={() => navigation.navigate(item.path)}>
        <Text style={styles.text}>{item.title}</Text>
        <Text>▶</Text>
      </Pressable>
    )}
  />
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f7fa',
  },
  card: {
    borderRadius: 5,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});

export default AnimationListing;
