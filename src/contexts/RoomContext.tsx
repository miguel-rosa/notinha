import React, { FC, createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getFirestore, collection, query, getDocs,onSnapshot, arrayUnion, updateDoc, doc, getDoc, setDoc, DocumentData, where, arrayRemove, deleteDoc, addDoc, FieldPath} from 'firebase/firestore';

import { app, auth } from '../../data/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNavigatorFactory, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthState } from 'react-firebase-hooks/auth';

import {queryUserRoom} from './queries/queryUserRoom';
import { Note } from '../types/note';

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

type Notes = {
  slug: string;
  notes: Note[]
}

type Rooms = any;

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
  const [user] = useAuthState(auth);
  const [notes, setNotes] = useState<Notes | undefined>(undefined);
  const [hasRoom, setHasRoom] = useState<boolean>(false);
  const [initiated, setInitiated] = useState<boolean>(false);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);

  const [userSavedRooms, setUserSavedRoomd] = useState<Rooms | undefined>(undefined);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const alreadyHaveRoom = async () => {
    const roomSlug = await AsyncStorage.getItem('@room-slug');
    if (!roomSlug) {return;}
    setSlug(roomSlug);
    return true;
  };

  const navigateToNotes = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Notes' }],
    });
  }, [navigation]);

  const createRoom = useCallback(async (slug: string, name: string) => {
    const roomRef = doc(db, 'room', slug);
    const roomSnap = await getDoc(roomRef);
    console.log('roomSnap', roomSnap);
    // Criar retorno para o usuário, avisando que o grupo já existe
    if (roomSnap.exists()) {
      console.log('group already exists');
      return;
    }
    try {
      console.log('user', user?.email);
      const newRoom = await setDoc(doc(db, 'room', slug), {name:name, notes:[], user:user?.email});
      await addDoc(collection(db, 'userRoom'), {
        roomSlug: slug,
        userEmail: user?.email,
      });
      console.log('Room criado!', newRoom);
      setSlug(slug);
      setName(name);
      navigateToNotes(slug);
    } catch (e) {
      console.error('Error creating document: ', e);
    }

  }, [navigateToNotes, user?.email]);

  useEffect(() => {
    console.log('slug', slug);
    console.log('user', user);
    if (!user || !slug) {return;}
    const slugExist = async () => {
      const roomRef = doc(db, 'room', slug);
      const roomSnap = await getDoc(roomRef);
      if (!roomSnap.exists()) {return;}
      const unsub = onSnapshot(doc(db, 'room', slug), (doc) => {
        setNotes(doc?.data()?.notes);
        setName(doc?.data()?.name);
      });
    };
    slugExist();
  }, [slug, user]);

  const getRoom = useCallback(async (text:string) => {

    const roomRef = doc(db, 'room', text);
    const roomSnap = await getDoc(roomRef);

    setInitiated(true);
    if (!roomSnap.exists()) {
      setHasRoom(false);
      return;
    }
    setName(roomSnap?.data()?.name);
    setSlug(text);
    setHasRoom(true);
    navigateToNotes(text);
  }, [navigateToNotes]);

  const getNotes = useCallback(async (text:string) => {

    console.log('getNotes');
    const roomRef = doc(db, 'room', text);
    console.log('where', text, user?.email);
    console.log('where', text);

    const roomSnap = await getDoc(roomRef);

    const isRoomFavorited = (await getDocs(queryUserRoom(db, text, user?.email))).empty;
    setIsFavorited(!isRoomFavorited);
    console.log('!isRoomFavorited', !isRoomFavorited);
    setNotes(roomSnap?.data()?.notes);
  }, [setNotes, user?.email]);

  const handleFavoriteClick = async (shouldAdd:boolean) => {
    try {
      if (shouldAdd) {
        await addDoc(collection(db, 'userRoom'), {
          roomSlug: slug,
          userEmail: user?.email,
        });
        setIsFavorited(true);
      }
      else {
        const querySnapshot = await getDocs(queryUserRoom(db, slug, user?.email));
        const deleteOps = [] as any;

        querySnapshot.forEach((doc) => {
          deleteOps.push(deleteDoc(doc.ref));
        });
        Promise.all(deleteOps).then(() => console.log('documents deleted'));
        setIsFavorited(false);
      }
    } catch (e) {
      console.log('Error on favorites', e);
    }
  };

  const addNote = async (note:Note) => {
    try {
      const roomRef = doc(db, 'room', slug);
      const isTitle = note.text.charAt(0) === '/';

      await updateDoc(roomRef, {
        notes: arrayUnion({
          ...note,
          isTitle:isTitle,
          text: isTitle ? note.text.substring(1) : note.text,
        }),
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const addNotes = async (slug: string, notes:Note[]) => {
    try {
      const roomRef = doc(db, 'room', slug);
      await updateDoc(roomRef, {
        notes: arrayUnion(...notes),
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const deleteNote = async (id:string) => {
    try {
      const roomRef = doc(db, 'room', slug);
      const roomSnap = await getDoc(roomRef);
      const selectedItem = roomSnap?.data()?.notes.find(({id:noteId}:{id:string}) => noteId === id);
      await updateDoc(roomRef, {
        notes: arrayRemove(selectedItem),
      });
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };

  const handleNoteCheck = async (id: string, checked: boolean) => {

    const roomRef = doc(db, 'room', slug);
    const roomSnap = await getDoc(roomRef);
    const {notes:localNotes, ...otherRoomValues} = roomSnap?.data();
    const selectedItem = localNotes.find(({id:noteId}:{id:string}) => noteId === id);
    const items = roomSnap?.data()?.notes.map((note:Note) => (
      note.id === id ? {
        id: id,
        text: selectedItem.text,
        checked:checked }
        : note
    ));

    await setDoc(roomRef, {
      notes: items,
      ...otherRoomValues,
    });
  };

  const getUserFavoriteRooms = useCallback(async () => {
    console.log('called');
    const userRoomRef = collection(db, 'userRoom');
    const queryRoomsOfUser = query(userRoomRef, where('userEmail', '==', user?.email));
    const querySnapshotRoomsOfUser = await getDocs(queryRoomsOfUser);

    const slugs = querySnapshotRoomsOfUser.docs?.map( (doc) => {
      return doc?.data()?.roomSlug;
    });
    console.log('slugs', slugs);

    const roomRef = collection(db, 'room');
    const queryRooms = query(roomRef, where('__name__', 'in', slugs));
    const querySnapshotRooms = await getDocs(queryRooms);

    const rooms = querySnapshotRooms.docs.map( doc => {
      return {
        slug: doc.id,
        name: doc.data().name,
        notes: doc.data().notes.slice(0, 3).map( ({id, text}) => ({
          text: `${text.slice(0,24)}...`,
          id: id,
        })),
      };
    });
    setUserSavedRoomd(rooms);
    // const roomSnap = await getDoc(roomRef);
    // console.log('querySnapshot', roomSnap);
  }, [user?.email]);

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
          isFavorited,
        },
        userSavedRooms,
        handleFavoriteClick,
        getUserFavoriteRooms,

      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

const useRoom = () => {
  const context = useContext(RoomContext);

  if (!context) {throw new Error('useRoom should be used inside a RoomContext');}

  return context;
};

export default useRoom;
