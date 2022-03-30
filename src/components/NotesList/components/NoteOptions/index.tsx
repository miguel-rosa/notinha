import React from "react";
import useNoteOptions from "../../../../contexts/NoteOptionsContext";
import useRoom from "../../../../contexts/RoomContext";
import BottomModal from "../../../BottomModal";
import Button from "../../../Button";

const NoteOptions = () => {
  const {isNoteOptionsVisible, hideOptions, noteId} = useNoteOptions();
  const { deleteNote } = useRoom();

  const handleButtonClick = () => {
     deleteNote(noteId)
    hideOptions()
  }

  return isNoteOptionsVisible ? (
     (
        <BottomModal title="Opções" closeModal={hideOptions}>
          <Button type="danger" onPress={handleButtonClick}>
            Deletar nota
          </Button>
        </BottomModal>
      )
  ) : null
}

export default NoteOptions