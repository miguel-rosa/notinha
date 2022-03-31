import React, { FC, useState} from 'react';

import BottomModal from '../BottomModal';
import Button from '../Button';
import CreateGroupModal from '../CreateGroupModal';
import JoinGroupModal from '../JoinGroupModal';

type RoomOptionsModalProps = {
  closeModal(arg:boolean): void;
}

const RoomOptionsModal:FC<RoomOptionsModalProps> = ({closeModal}) => {
  const [showBottomModal, setShowBottomModal] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

  return (
    <BottomModal closeModal={() => closeModal(false)} title="Opções de grupo">
      <Button onPress={() => setShowCreateRoomModal(true)}>Criar grupo</Button>
      {showCreateRoomModal && <CreateGroupModal closeModal={() => setShowCreateRoomModal(false)}/>}
      <Button type="secondary" onPress={() => setShowBottomModal(true)}>Entrar em um grupo</Button>
      {showBottomModal && <JoinGroupModal closeModal={() => setShowBottomModal(false)}/>}
    </BottomModal>
  );
};

export default RoomOptionsModal;
