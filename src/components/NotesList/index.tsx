import React, { FC } from "react";
import { FlatList, StyleSheet, View} from "react-native";
import NoteItem from "./components/NoteItem";

type NotesList = {
  notes: any
}

const NotesList:FC<NotesList> = ({notes}) => {

  const renderItem = ({item}) => (
    <NoteItem {...item}/>
   )

  return (
    <View style={styles.notesList}>
      <FlatList 
        data={notes}
        renderItem={renderItem}
        keyExtractor={notes => notes.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  notesList: {
    paddingVertical: 16,
    paddingBottom:54
  }
})

export default NotesList;