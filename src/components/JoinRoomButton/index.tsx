import React, {useState} from 'react';
import { StyleSheet} from 'react-native';
import Button from '../../components/Button';
import JoinGroupModal from '../../components/JoinGroupModal';

const JoinRoomButton:React.FC = () => {
  const [showBottomModal, setShowBottomModal] = useState(false);
  return (
    <>
    <Button type="secondary" onPress={() => setShowBottomModal(true)}>Entrar em um grupo sem login</Button>
    {showBottomModal && <JoinGroupModal closeModal={() => setShowBottomModal(false)}/>}
    </>

  );
};

export default JoinRoomButton;
