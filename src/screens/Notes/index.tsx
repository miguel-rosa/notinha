import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import AddNoteForm from '../../components/AddNoteForm';
import NotesList from '../../components/NotesList';
import Text from '../../components/Text';
import useGroup from '../../contexts/RoomContext';

import { app } from "../../../data/firebase";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import BottomModal from '../../components/BottomModal';
import Button from '../../components/Button';
import { NoteOptionsStorage } from '../../contexts/NoteOptionsContext';
import NoteOptions from '../../components/NotesList/components/NoteOptions';

const db = getFirestore(app);
const Notes = ({navigation}) => {

  const {getNotes, notes, group:{slug, name}} = useGroup()

  useEffect(() => {
    getNotes(slug)
   
  }, [getNotes])

  const onBackButtonPress = () => {
    navigation.navigate("Home")
  }
  
  console.log('notes', notes)
  return (
    <NoteOptionsStorage>
      <ScrollView style={styles.notes}>
      <View style={styles.header}>
      <Button buttonStyle={styles.button} size="small" type="secondary" onPress={onBackButtonPress}>Voltar</Button>
        </View>
          <Text fontSize={28} weight="700">{name}</Text>
          <NotesList notes={notes} />
      </ScrollView>
      <AddNoteForm/>
      <NoteOptions/>
    </NoteOptionsStorage>
  )
}

const styles = StyleSheet.create({
  notes: {
    flex:1,
    padding: 16,
    paddingTop:40
  },
  header: {
    alignItems:"flex-start"
  },
  button: {
    paddingHorizontal: 0,
    paddingVertical:0
  }
})

export default Notes