import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import useNoteOptions from '../../../../contexts/NoteOptionsContext';
import useRoom from '../../../../contexts/RoomContext';
import Checkbox from '../../../Checkbox';
import Text from '../../../Text';

type NoteItemProps = {
  id: string;
  text: string;
  checked: boolean;
  isTitle: boolean;
}

const NoteItem: FC<NoteItemProps> = ({ id, text, checked, isTitle }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const { handleNoteCheck } = useRoom();
  const {showOptions} = useNoteOptions();

  const handleNoteClick = () => {
    setIsChecked((previousIsChecked) => !previousIsChecked);
    console.log('checked', checked, isChecked);
    handleNoteCheck(id, !isChecked);
  };

  const handleNoteLongPress = () => {
    showOptions(id);
  };

  return (
    <TouchableOpacity accessibilityRole="button"
      style={isTitle ? styles.noteTitle : styles.noteItem}
      onPress={isTitle ? () => null : handleNoteClick }
      onLongPress={handleNoteLongPress}
    >
      {
        !isTitle && <Checkbox checked={isChecked} onPress={handleNoteClick} />
      }
      <Text style={isTitle ? styles.title : [styles.text, isChecked && { opacity: 0.7, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  noteTitle: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  text: {
    marginLeft: 10,
    // flexShrink:1,
  },
});

export default NoteItem;
