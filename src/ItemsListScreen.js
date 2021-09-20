import React, {useEffect, useState} from 'react';
import {View, RefreshControl, FlatList} from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import {GetEventsAction} from './actions';
import ItemListItem from './components/ItemListItem';

const updateInterval = 60;

const ItemListScreen = props => {
  const {navigation} = props;
  const [scrollOffsetY, setScrollOffsetY] = useState(0);
  const [updateEnabled, setUpdateEnabled] = useState();
  const [remainingTimer, setRemainingTimer] = useState(updateInterval);
  const items = useSelector(({app}) => app.items);
  const itemsLoading = useSelector(({app}) => app.itemsLoading);
  const updateDate = useSelector(({app}) => app.updateDate);
  const dispatch = useDispatch();
  const updateList = () => {
    dispatch(GetEventsAction());
    setRemainingTimer(updateInterval);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUpdateEnabled(true);
      updateList();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setUpdateEnabled(false);
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    if (scrollOffsetY <= 0 && updateEnabled) {
      let timer = setInterval(() => {
        updateList();
      }, remainingTimer * 1000);
      return () => {
        setRemainingTimer(updateInterval - (timer % updateInterval));
        return clearInterval(timer);
      };
    }
  }, [scrollOffsetY, updateEnabled, updateDate]);
  const onRefresh = () => {
    if (new Date().getTime() - updateDate > 15000) {
      updateList();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={(item)=><ItemListItem item={item}/>}
        keyExtractor={item => item.id}
        scrollEventThrottle={200}
        refreshControl={
          <RefreshControl refreshing={itemsLoading} onRefresh={onRefresh} />
        }
        onScroll={e => {
          if (e.nativeEvent.contentOffset.y >= 0) {
            setScrollOffsetY(e.nativeEvent.contentOffset.y);
          }
        }}
      />
    </View>
  );
};

export default ItemListScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    padding: 20,
  },
};
