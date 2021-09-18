import React from 'react';
import {View, Text} from 'react-native';

const ItemScreen = props => {
  const {route} = props;
  const {item} = route.params;
  return (
    <View style={styles.container}>
      <Text>id - {item.id}</Text>
      <Text>type - {item.type}</Text>
      <Text>login - {item.actor.login}</Text>
    </View>
  );
};

export default ItemScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
};
