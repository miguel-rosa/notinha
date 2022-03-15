import React, { FC, createContext, useState, useContext } from "react";
import { getFirestore, collection, query, getDocs, addDoc, DocumentData} from "firebase/firestore";
import { app } from "../../data/firebase";

type RoomContextType = {
  notes: DocumentData[];
  getRoom(room: string): void;
}

const db = getFirestore(app);
const queryGroups= query(collection(db, "room"));

export const RoomContext = createContext({} as RoomContextType);

export const RoomStorage:FC = ({children}) => {
  const [notes, setNotes] = useState<DocumentData[]>([])

  const getRoom = async (text:string) => {
    console.log("text", text)
    const querySnapshot = await getDocs(queryGroups);
    // setGroups(querySnapshot.docs.map(doc => doc.data()))
    console.log("get",querySnapshot.docs.map(doc => doc.data()) )
    setNotes(querySnapshot.docs.map(doc => doc.data()) )
  }

  return (
    <RoomContext.Provider
      value={{
        notes,
        getRoom
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