import React, { FC } from 'react';
import { FlatList, StyleSheet, View} from 'react-native';
import useRoom from '../../contexts/RoomContext';
import GroupItem from './components/GroupItem';

type GroupsList = {
  // groups: any
}

const GroupsList:FC<GroupsList> = ({}) => {
  const { userSavedRooms: groups} = useRoom();

  const renderItem = ({item}) => (
    <GroupItem {...item}/>
  );

  return (
    <View style={styles.groupsList}>
      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={group => group.slug}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupsList: {
    paddingVertical: 16,
  },
});

export default GroupsList;
