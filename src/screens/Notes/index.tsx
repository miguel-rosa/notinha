import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import AddNoteForm from '../../components/AddNoteForm';
import NotesList from '../../components/NotesList';
import Text from '../../components/Text';
import useRoom from '../../contexts/RoomContext';

import { app, auth } from "../../../data/firebase";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import BottomModal from '../../components/BottomModal';
import Button from '../../components/Button';
import { NoteOptionsStorage } from '../../contexts/NoteOptionsContext';
import NoteOptions from '../../components/NotesList/components/NoteOptions';
import IconFavorite from '../../components/Icons/IconFavorite';
import { useAuthState } from 'react-firebase-hooks/auth';

const db = getFirestore(app);

const UserButton = ({navigation}) => {
  const [user] = useAuthState(auth);
  return (
    <TouchableOpacity onPress={() => navigation.navigate("User") } style={{width: 20, height:20, borderRadius:10, backgroundColor:"red"}}>
      <Image source={{uri: user?.photoURL || undefined}} />
    </TouchableOpacity>
  )
}

const Notes = ({navigation}) => {

  const {getNotes, notes, group:{slug, name, isFavorited}, handleFavoriteClick} = useRoom()

  useEffect(() => {
    getNotes(slug)
  }, [getNotes, slug])

  useEffect(() => {
    if(!slug) return
  })

  const onIconFavoritePress = () => {
    handleFavoriteClick(!isFavorited)
  }

  const onBackButtonPress = () => {
    navigation.navigate("User")
  }
  
  console.log('notes', notes)
  return (
    <NoteOptionsStorage>
      <ScrollView style={styles.notes}>
      <View style={styles.header}>
        <Button buttonStyle={styles.button} size="small" type="secondary" onPress={onBackButtonPress}>Voltar</Button>
        <IconFavorite fill={isFavorited} onPress={onIconFavoritePress}/>
        <UserButton navigation={navigation}/>
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
    alignItems:"center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    paddingHorizontal: 0,
    paddingVertical:0
  }
})

export default Notes