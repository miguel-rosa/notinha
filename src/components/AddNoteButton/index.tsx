import React, { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import{ v4 as uuid} from "uuid";
import useGroup from "../../contexts/RoomContext";


import BottomModal from "../BottomModal";
import Button from "../Button";
import IconPlus from "../Icons/IconPlus";
import IconTrash from "../Icons/IconTrash";
import Input from "../Input";

type AddNoteButtonProps = {

}

const AddNoteButton:FC<AddNoteButtonProps> = ({}) => {
  const [items, setItems] = useState([]);
  const {group:{slug}, addNotes} = useGroup();
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddNote = () => {
    if(!text) return
    const id = uuid();
    setItems(previousItems => [...previousItems, {id, text, checked: false}])
    setText("")
  }

  const handleRemoveNote = (index: number) => {
    setItems((previousItems) => previousItems.filter((_, previousIndex) => index !== previousIndex ))
  }

  const handleSaveNotes = async () => {
    await addNotes(slug, items)
    setShowModal(false)
    setItems([]);
  }

  return (
    <>
    <TouchableOpacity style={styles.addNoteButton} onPress={() => setShowModal((previousShowModal => !previousShowModal))}>
      <IconPlus size={35}/>
    </TouchableOpacity>
     {
      showModal && (
        <BottomModal
          title="Adicionar item"
          closeModal={() => setShowModal(false)}
          buttonOptions={{
            show: true,
            text: "Salvar itens",
            size:"small",
          }}
          onPress={handleSaveNotes}
        >
        <View>
          {
            items.length > 0 && items.map(({text}, index) => (
              <View key={index} style={styles.item}>
                <Text>
                  {text}
                </Text>
                <IconTrash onPress={() => handleRemoveNote(index)} />
              </View>
            ))
          }
          <View style={styles.form}>
            <Input
              autoFocus={true}
              withoutBorder={true}
              value={text}
              onChangeText={(inputText) => setText(inputText)}
              style={styles.input}
            />
            <Button
              size="small" 
              useSpacing={false}
              onPress={handleAddNote}
            >+</Button>
          </View>
        </View>
      </BottomModal>
      )
    }
    </>
  )
}

const styles = StyleSheet.create({
  addNoteButton: {
    position: "absolute",
    width: 50,
    height: 50,
    bottom: 16,
    borderRadius:50,
    right: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d66ff"
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom:8
  },
  form: {
    flexDirection: "row"
  },
  input: {
    flex: 1
  }
})

export default AddNoteButton