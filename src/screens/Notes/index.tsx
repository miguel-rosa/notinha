import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AddNoteButton from '../../components/AddNoteButton';
import NotesList from '../../components/NotesList';
import Text from '../../components/Text';
import useGroup from '../../contexts/RoomContext';

import { app } from "../../../data/firebase";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";

const db = getFirestore(app);
const Notes = () => {

  const {getNotes, notes, slug} = useGroup()

  useEffect(() => {
    getNotes(slug)
   
  }, [getNotes])
  
  console.log('notes', notes)
  return (
    <View style={styles.notes}>
      <NotesList notes={notes} />
      <AddNoteButton/>
    </View>
  )
}

const styles = StyleSheet.create({
  notes: {
    flex:1
  }
})

export default Notes