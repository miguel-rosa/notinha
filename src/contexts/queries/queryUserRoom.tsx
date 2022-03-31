import { collection, query, where } from 'firebase/firestore';

export const queryUserRoom = (db: any, text: string, email:string | null | undefined) => {
  return query(collection(db, 'userRoom'), where('roomSlug', '==', text), where('userEmail', '==', email));
};
