import React, {useEffect, useState, useCallback } from "react";
import { View, StyleSheet} from "react-native";
import Button from "../../components/Button";
import CreateGroupModal from "../../components/CreateGroupModal";
import JoinGroupModal from "../../components/JoinGroupModal";
import Logo from "../../components/Logo";
import useGroup from "../../contexts/RoomContext";

const Home:React.FC<{navigation: any}> = ({navigation}) => {
  const [showBottomModal, setShowBottomModal] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

  return (
    <View style={styles.home}>
      <Logo/>
      <Button onPress={() => setShowCreateRoomModal(true)}>Criar grupo</Button>
      {showCreateRoomModal && <CreateGroupModal closeModal={() => setShowCreateRoomModal(false)}/>}
      <Button type='secondary' onPress={() => setShowBottomModal(true)}>Entrar em um grupo</Button>
      {showBottomModal && <JoinGroupModal closeModal={() => setShowBottomModal(false)}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end'
  },
  mainButton:{
    backgroundColor: '#0d66ff',
    alignItems: 'center',
    borderRadius: 8,
    fontSize: 18,
    padding: 16
  },
  secondaryButton: {
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 8,
    fontSize: 20,
    padding: 16,
  },
  buttonText: {
    fontSize:16,
    color: '#fff'
  }
})

export default Home;