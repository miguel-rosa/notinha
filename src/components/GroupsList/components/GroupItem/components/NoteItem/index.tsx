import React, {FC} from 'react';
import { StyleSheet } from 'react-native';
import Text from '../../../../../Text';

type NoteItemProps = {
  text: string
}

const NoteItem:FC<NoteItemProps> = ({text}) => {
  return (
    <Text style={styles.noteItem}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    color: '#8f8f8f',
    fontSize: 12,
  },
});

export default NoteItem;
