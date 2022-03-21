import React, { FC, useState } from "react";
import { Modal, View, StyleSheet } from "react-native"
import IconClose from "../Icons/IconClose";
import Text from "../Text";

type PopupProps = {
  title?: string;
  text: string;
  visible: boolean;
  animationType: "slide" | "fade" | "none"
}

const Popup:FC<PopupProps>= ({
  title,
  text,
  visible,
  animationType
}) => {
  const [hide, setHide] = useState(true);
  const [kill, setKill] = useState(false);

  React.useEffect(() => {
    if(kill) setHide(true)
  }, [kill])

  return (
    <Modal visible={hide && visible} animationType={animationType} transparent={true}>
      <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <IconClose onPress={() => {
            setHide(false)
            setKill(true)
          }} style={styles.close}/>
        </View>
        <View style={styles.content}>
          <Text>
            {text}
          </Text>
        </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    width: 300,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 16,
  },
  header: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    padding: 16,
    borderBottomColor: '#ebedf0',
    borderBottomWidth: 1
  },
  close: {
    position: 'absolute',
    right: 16,
    alignSelf: 'center',
    top: 13
  },
  title: {
    fontSize: 16
  },
  content: {
    padding: 16,
    justifyContent: "center",
    textAlign: "center"
  },
  text: {

  }
})

export default Popup