import React, { FC } from "react";
import { FlatList, StyleSheet, ScrollView} from "react-native";
import NoteItem from "./components/NoteItem";

type NotesList = {
  notes: any
}

const NotesList:FC<NotesList> = ({notes}) => {

  const renderItem = ({item}) => (
    <NoteItem {...item}/>
   )

  return (
    <ScrollView style={styles.notesList}>
      <FlatList 
        data={notes}
        renderItem={renderItem}
        keyExtractor={notes => notes.id}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  notesList: {
    padding: 16
  }
})

export default NotesList;