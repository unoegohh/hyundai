import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ItemScreen from './ItemScreen';
import ItemListScreen from './ItemsListScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ItemList" component={ItemListScreen} />
      <Stack.Screen name="Item" component={ItemScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigation;
