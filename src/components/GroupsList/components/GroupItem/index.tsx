import React, { FC, useState, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import useRoom from '../../../../contexts/RoomContext';
import BottomModal from '../../../BottomModal';
import Button from '../../../Button';
import Checkbox from '../../../Checkbox';
import IconTrash from '../../../Icons/IconTrash';
import Text from '../../../Text';
import NoteItem from './components/NoteItem';

type GroupItemProps = {
  id: string;
  text: string;
  checked: boolean;
}


const GroupItem: FC<GroupItemProps> = ({ slug, name, notes }) => {
  console.log( name, notes, slug);

  const { getRoom } = useRoom();

  const onGroupPress = () => {
    getRoom(slug);
  };

  const renderItem = ({item}) => (
    <NoteItem {...item}/>
  );

  return (
    <TouchableOpacity accessibilityRole="button"
      style={styles.groupItem}
      onPress={onGroupPress}
    >
      <Text style={styles.slug}>{slug}</Text>
      <Text style={styles.name}>{name}</Text>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={notes => notes.id}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  groupItem: {
    backgroundColor: 'white',
    padding: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,

  },
  name: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 6,
  },
  slug: {
    fontSize: 11,
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    color: '#6c6b6b',
  },
});

export default GroupItem;
