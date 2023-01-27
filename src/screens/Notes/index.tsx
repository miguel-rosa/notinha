import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AddNoteForm from '../../components/AddNoteForm';
import NotesList from '../../components/NotesList';
import Text from '../../components/Text';
import useRoom from '../../contexts/RoomContext';

import Button from '../../components/Button';
import { NoteOptionsStorage } from '../../contexts/NoteOptionsContext';
import NoteOptions from '../../components/NotesList/components/NoteOptions';
import IconFavorite from '../../components/Icons/IconFavorite';
import IconCopy from '../../components/Icons/IconCopy';

const Notes = ({navigation}) => {

  const {getNotes, notes, group:{slug, name, isFavorited}, handleFavoriteClick} = useRoom();
  const scrollViewRef = useRef();

  useEffect(() => {
    getNotes(slug);
  }, [getNotes, slug]);

  useEffect(() => {
    if (!slug) {return;}
  });

  const onIconFavoritePress = () => {
    handleFavoriteClick(!isFavorited);
  };

  const onCopyPress = () => {
    navigator.clipboard.writeText(notes.filter(({checked, isTitle}) => isTitle || checked).map(({text, isTitle}) => {
      return (
        isTitle ? `\n*${text}*\n` : `• ${text}\n`
      );
    } ).join(''));
  };

  const onBackButtonPress = () => {
    navigation.navigate('Groups');
  };

  console.log('notes', notes);
  return (
    <NoteOptionsStorage>
      <ScrollView style={styles.notes}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }}
      >
        <View style={styles.header}>

          <Button buttonStyle={styles.button} size="small" type="secondary" onPress={onBackButtonPress}>Voltar</Button>
          <View style={styles.headerOptions}>
            <IconCopy onPress={onCopyPress}/>
            <IconFavorite fill={isFavorited} onPress={onIconFavoritePress}/>
          </View>
        </View>
        <Text fontSize={28} weight="700">{name}</Text>
        <Text style={styles.subTitle} >{slug}</Text>
        <NotesList notes={notes} />
      </ScrollView>
      <AddNoteForm/>
      <NoteOptions/>
    </NoteOptionsStorage>
  );
};

const styles = StyleSheet.create({
  notes: {
    flex:1,
    padding: 16,
    paddingTop:40,
    marginBottom: 42,
  },
  header: {
    alignItems:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingHorizontal: 0,
    paddingVertical:0,
  },
  subTitle: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 14,
    borderRadius:4,
    backgroundColor:'rgb(230,230,230)',
    alignSelf: 'flex-start',
  },
});

export default Notes;
