import React, { FC, createContext, useState, useContext, useEffect, useCallback } from "react";
import { getFirestore, collection, query, getDocs, onSnapshot, arrayUnion, updateDoc, doc, getDoc, setDoc, DocumentData, where, arrayRemove} from "firebase/firestore";

import { app } from "../../data/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RoomContextType = {
  getRoom(room: string): void;
  getNotes(slug: string): Promise<void>;
  alreadyHaveRoom():string | undefined;
  navigateToNotes(slug: string):void;
  note: any;
  slug: string;
  hasRoom: boolean;
  initiated: boolean;
  addNotes():void;
  createRoom(slug: string): void;
  handleNoteCheck(id: string, checked:boolean): void
}

type Note = {
  id: string;
  text: string;
  checked: boolean;
}

type Notes = {
  slug: string;
  notes: Note[]
}

type RoomData = DocumentData & {
  slug: string
}

type RootStackParamList = {
  Notes: { slug: string };
}

const db = getFirestore(app);
const queryGroups= query(collection(db, "room"));

export const RoomContext = createContext({} as RoomContextType);

export const RoomStorage:FC = ({children}) => {
  const [notes, setNotes] = useState<Notes | undefined>(undefined)
  const [hasRoom, setHasRoom] = useState<boolean>(false);
  const [initiated, setInitiated] = useState<boolean>(false);
  const [slug, setSlug] = useState("")
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const alreadyHaveRoom = async () => {
    const roomSlug = await AsyncStorage.getItem('@room-slug')
    if(!roomSlug) return
    setSlug(roomSlug)
    return true
  }
  const createRoom = async (slug: string) => {
    const roomRef = doc(db, "room", slug);
    const roomSnap = await getDoc(roomRef);
    console.log('roomSnap', roomSnap)
    //Criar retorno para o usuário, avisando que o grupo já existe
    if(roomSnap.exists()) {
      console.log("grupo já existe")
      return
    }
    try {
      const newRoom = await setDoc(doc(db, "room", slug), {notes:[]});
      console.log('Room criado!', newRoom)
      setSlug(slug)
      navigateToNotes(slug)
    } catch (e) {
      console.error("Error creating document: ", e);
    }

  }

  useEffect(() => {
    if(!slug) return
    const slugExist = async () => {
      const roomRef = doc(db, "room", slug);
      const roomSnap = await getDoc(roomRef);
      if(!roomSnap.exists()) return
      const unsub = onSnapshot(doc(db, "room", slug), (doc) => {
        setNotes(doc?.data()?.notes)
    });
      AsyncStorage.setItem('@room-slug', slug);
    }
    slugExist()
  }, [slug])

  useEffect(() => {
    if(!slug) return
    const roomRef = doc(db, "room", slug);
    console.log('roomRef', roomRef)
    const unsub = onSnapshot(roomRef, (doc) => {
      console.log('onSnap')
      console.log("test",doc?.data()?.notes);
    });  
    return () => unsub()
  }, [])

  const getRoom = async (text:string) => {

    const roomRef = doc(db, "room", text);
    const roomSnap = await getDoc(roomRef);

    setInitiated(true)
    if(!roomSnap.exists()) {
      setHasRoom(false);
      return
    }
    setSlug(text)
    setHasRoom(true)
    navigateToNotes(text)
  }
  // const getRoom = async (text:string) => {
  //   const querySnapshot = await getDocs(queryGroups,) 
  //   const actualRoom = querySnapshot.docs.find((item) => item.data()['slug'] === text )
  //   setInitiated(true)
  //   if(!actualRoom) {
  //     setHasRoom(false);
  //     return
  //   }
  //   setSlug(text)
  //   setHasRoom(true)
  //   navigateToNotes(text)
  // }

  const navigateToNotes = (slug: string) => {
    navigation.navigate("Notes", {slug}) 
  }

  const getNotes = useCallback(async (text:string) => {
    
    const roomRef = doc(db, "room", text);
    const roomSnap = await getDoc(roomRef);
    setNotes(roomSnap?.data()?.notes)
  }, [setNotes])

  const addNotes = async (slug: string, notes:Note[]) => {
    try {
      
      const roomRef = doc(db, "room", slug);
      await updateDoc(roomRef, {
        notes: arrayUnion(...notes)
      });
      // setDoc(roomRef, {notes}, { merge: true })

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleNoteCheck = async (id: string, checked: boolean) => {
    
    const roomRef = doc(db, "room", slug);
    const roomSnap = await getDoc(roomRef);
    const selectedItem = roomSnap?.data()?.notes.find(({id:noteId}:{id:string}) => noteId === id)
    const items = roomSnap?.data()?.notes.map((note:Note) => (
        note.id === id ? {
        id: id,
        text: selectedItem.text,
        checked:checked }
       : note
    ));
    console.log('itemToRemove', selectedItem, items)
    await setDoc(roomRef, {
      notes: items
    });
  }

  return (
    <RoomContext.Provider
      value={{
        getRoom,
        alreadyHaveRoom,
        hasRoom,
        getNotes,
        initiated,
        notes,
        slug,
        navigateToNotes,
        addNotes,
        createRoom,
        handleNoteCheck
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}

const useGroup = () => {
  const context = useContext(RoomContext);

  if(!context) throw new Error('useGroup should be used inside a RoomContext');

  return context
}

export default useGroup;