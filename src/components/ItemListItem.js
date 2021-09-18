import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const ItemListItem = props => {
  const {item, navigation} = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => {
        navigation.navigate('Item', {item});
      }}>
      <Text style={styles.itemDesc}>
        {item.id} - {item.type}
      </Text>
      <Text>{item.actor.login}</Text>
    </TouchableOpacity>
  );
};

export default ItemListItem;

const styles = {
  container: {
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  itemDesc: {
    fontSize: 10,
    color: 'grey',
  },
};
