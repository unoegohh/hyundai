import React, {useEffect, useState} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {GetEventsAction} from './actions';
import ItemListItem from './components/ItemListItem';

const updateInterval = 60;

const ItemListScreen = props => {
  const {items, itemsLoading, GetEventsAction, navigation, updateDate} = props;
  const [scrollOffsetY, setScrollOffsetY] = useState(0);
  const [updateEnabled, setUpdateEnabled] = useState();
  const [remainingTimer, setRemainingTimer] = useState(updateInterval);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUpdateEnabled(true);
      GetEventsAction();
      setRemainingTimer(updateInterval);
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
        setRemainingTimer(updateInterval);
        GetEventsAction();
      }, remainingTimer * 1000);
      return () => {
        setRemainingTimer(updateInterval - (timer % updateInterval));
        return clearInterval(timer);
      };
    }
  }, [scrollOffsetY, updateEnabled, updateDate]);
  const onRefresh = () => {
    if (new Date().getTime() - updateDate > 15000) {
      GetEventsAction();
      setRemainingTimer(updateInterval);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        scrollEventThrottle={200}
        refreshControl={
          <RefreshControl refreshing={itemsLoading} onRefresh={onRefresh} />
        }
        onScroll={e => {
          if (e.nativeEvent.contentOffset.y >= 0) {
            setScrollOffsetY(e.nativeEvent.contentOffset.y);
          }
        }}>
        {items.map((item, index) => {
          return (
            <ItemListItem item={item} key={index} navigation={navigation} />
          );
        })}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({app}) => {
  const {items, itemsLoading, updateDate} = app;
  return {items, itemsLoading, updateDate};
};
export default connect(mapStateToProps, {GetEventsAction})(ItemListScreen);

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    padding: 20,
  },
};
