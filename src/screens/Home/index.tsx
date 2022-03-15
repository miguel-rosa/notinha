import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { app }  from "../../../data/firebase";
import { getFirestore, collection, query, getDocs, addDoc} from "firebase/firestore";
import Button from "../../components/Button";
import JoinGroupModal from "../../components/JoinGroupModal";


const db = getFirestore(app);
const queryGroups= query(collection(db, "room"));

const Home:React.FC<{navigation: any}> = ({navigation}) => {
  const [showBottomModal, setShowBottomModal] = useState(false);

  return (
    <View style={styles.home}>
      <Button>Criar grupo</Button>
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