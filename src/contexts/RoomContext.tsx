import React, { FC, createContext, useState, useContext, useEffect, useCallback } from "react";
import { getFirestore, collection, query, getDocs,onSnapshot, arrayUnion, updateDoc, doc, getDoc, setDoc, DocumentData, where, arrayRemove, deleteDoc} from "firebase/firestore";

import { app, auth } from "../../data/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuthState } from "react-firebase-hooks/auth";

import {queryUserRoom} from "./queries/queryUserRoom";

type RoomContextType = {
  getRoom(room: string): void;
  getNotes(slug: string): Promise<void>;
  alreadyHaveRoom():string | undefined;
  navigateToNotes(slug: string):void;
  note: any;
  hasRoom: boolean;
  initiated: boolean;
  addNotes():void;
  addNote(note:Note):void;
  createRoom(slug: string, name:string): void;
  handleNoteCheck(id: string, checked:boolean): void;
  deleteNote(id:string):void;
  group: {
    slug: string;
    name: string;
    isFavorited: boolean;
  },
  handleFavoriteClick(isFavorited: boolean): void;
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

export type RootStackParamList = {
  Notes: { slug: string };
  SignIn: {}
}

const db = getFirestore(app);
export const RoomContext = createContext({} as RoomContextType);

export const RoomStorage:FC = ({children}) => {
  const [user] = useAuthState(auth)
  const [notes, setNotes] = useState<Notes | undefined>(undefined)
  const [hasRoom, setHasRoom] = useState<boolean>(false);
  const [initiated, setInitiated] = useState<boolean>(false);

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [isFavorited, setIsFavorited] = useState(false)

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const alreadyHaveRoom = async () => {
    const roomSlug = await AsyncStorage.getItem('@room-slug')
    if(!roomSlug) return
    setSlug(roomSlug)
    return true
  }

  const createRoom = async (slug: string, name: string) => {
    const roomRef = doc(db, "room", slug);
    const roomSnap = await getDoc(roomRef);
    console.log('roomSnap', roomSnap)
    // Criar retorno para o usuário, avisando que o grupo já existe
    if(roomSnap.exists()) {
      console.log("group already exists")
      return
    }
    try {
      const newRoom = await setDoc(doc(db, "room", slug), {name:name, notes:[], user:user?.email});
      console.log('Room criado!', newRoom)
      setSlug(slug)
      setName(name)
      navigateToNotes(slug)
    } catch (e) {
      console.error("Error creating document: ", e);
    }

  }

  useEffect(() => {
    console.log('slug', slug)
    console.log("user", user)
    if(!user || !slug) return
    const slugExist = async () => {
      const roomRef = doc(db, "room", slug);
      const roomSnap = await getDoc(roomRef);
      if(!roomSnap.exists()) return
      navigateToNotes(slug)
      const unsub = onSnapshot(doc(db, "room", slug), (doc) => {
        setNotes(doc?.data()?.notes)
        setName(doc?.data()?.name)
    });
      AsyncStorage.setItem('@room-slug', slug);
    }
    slugExist()
  }, [slug])

  useEffect(() => {
    const checkSlug = async () => {
      const roomSlug = await AsyncStorage.getItem('@room-slug')
      if(!roomSlug) return
      setSlug(roomSlug)
    }
    checkSlug()
  }, [])

  const getRoom = async (text:string) => {

    const roomRef = doc(db, "room", text);
    const roomSnap = await getDoc(roomRef);

    setInitiated(true)
    if(!roomSnap.exists()) {
      setHasRoom(false);
      return
    }

    console.log('roomSnap?.data()?.name', roomSnap?.data()?.name)
    setName(roomSnap?.data()?.name)
    setSlug(text)
    setHasRoom(true)
    navigateToNotes(text)
  }

  const navigateToNotes = (slug: string) => {
    navigation.navigate("Notes", {slug}) 
  }

  const getNotes = useCallback(async (text:string) => {
   
    console.log('getNotes')
    const roomRef = doc(db, "room", text);
    console.log("where", text, user?.email)
    console.log("where", text)

    const roomSnap = await getDoc(roomRef);

    const isRoomFavorited = (await getDocs(queryUserRoom(db, text, user?.email))).empty
    setIsFavorited(!isRoomFavorited)
    console.log('!isRoomFavorited', !isRoomFavorited)
    setNotes(roomSnap?.data()?.notes)
  }, [setNotes])

  const handleFavoriteClick = async (shouldAdd:boolean) => {
    try {
    if(shouldAdd) {
      await setDoc(doc(db, "userRoom"), {
        roomSlug: slug,
        userEmail: user?.email
      })
    }
    else {
      const querySnapshot = await getDocs(queryUserRoom(db, slug, user?.email))
      const deleteOps = [];

      querySnapshot.forEach((doc) => {
        deleteOps.push(deleteDoc(doc.ref));      
      });
      Promise.all(deleteOps).then(() => console.log('documents deleted'))
    }
    } catch (e) {
      console.log("Error on favorites", e)
    }
  }

  const addNote = async (note:Note) => {
    try {
      const roomRef = doc(db, "room", slug);
      await updateDoc(roomRef, {
        notes: arrayUnion(note)
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const addNotes = async (slug: string, notes:Note[]) => {
    try {
      const roomRef = doc(db, "room", slug);
      await updateDoc(roomRef, {
        notes: arrayUnion(...notes)
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const deleteNote = async (id:string) => {
    try {
      const roomRef = doc(db, "room", slug);
      const roomSnap = await getDoc(roomRef);
      const selectedItem = roomSnap?.data()?.notes.find(({id:noteId}:{id:string}) => noteId === id)
      await updateDoc(roomRef, {
        notes: arrayRemove(selectedItem)
      });
    } catch (e) {
      console.error("Error deleting document: ", e);
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
      notes: items,
      name: roomSnap?.data()?.name,
      user: roomSnap?.data()?.user
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
        navigateToNotes,
        addNotes,
        addNote,
        deleteNote,
        createRoom,
        handleNoteCheck,
        group: {
          name,
          slug,
          isFavorited
        },
        handleFavoriteClick
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}

const useRoom = () => {
  const context = useContext(RoomContext);

  if(!context) throw new Error('useRoom should be used inside a RoomContext');

  return context
}

export default useRoom;