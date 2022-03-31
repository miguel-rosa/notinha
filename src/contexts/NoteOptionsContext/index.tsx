import React, { createContext, FC, useContext, useState } from 'react';

type NoteOptionsContextType = {
  isNoteOptionsVisible: boolean;
  hideOptions(): void;
  showOptions(id: string): void;
  noteId: string;
};

export const NoteOptionsContext = createContext({} as NoteOptionsContextType);

export const NoteOptionsStorage: FC = ({ children }) => {
  const [isNoteOptionsVisible, setIsNoteOptionsVisible] = useState(false);
  const [noteId, setNoteId] = useState('');

  const showOptions = (id: string) => {
    setIsNoteOptionsVisible(true);
    setNoteId(id);
  };

  const hideOptions = () => {
    setIsNoteOptionsVisible(false);
  };
  return (
    <NoteOptionsContext.Provider
      value={{ isNoteOptionsVisible, showOptions, hideOptions, noteId }}
    >
      {children}
    </NoteOptionsContext.Provider>
  );
};

const useNoteOptions = () => {
  const context = useContext(NoteOptionsContext);

  if (!context) {
    throw new Error(
      'useNoteOptions should be used inside a NoteOptionsContext'
    );
  }

  return context;
};

export default useNoteOptions;
