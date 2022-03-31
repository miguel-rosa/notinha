import React, { FC } from 'react';
import { FlatList, StyleSheet, View} from 'react-native';
import GroupItem from './components/GroupItem';

type GroupsList = {
  groups: any
}

const GroupsList:FC<GroupsList> = ({groups}) => {

  const renderItem = ({item}) => (
    <GroupItem {...item}/>
   );

  return (
    <View style={styles.groupsList}>
      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={groups => groups.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupsList: {
    paddingVertical: 16,
    paddingBottom:54,
  },
});

export default GroupsList;
