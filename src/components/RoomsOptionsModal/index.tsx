import React, { FC, useState} from 'react';

import BottomModal from '../BottomModal';
import Button from '../Button';
import CreateGroupModal from '../CreateGroupModal';
import JoinGroupModal from '../JoinGroupModal';

type RoomOptionsModalProps = {
  closeModal(arg:boolean): void;
  showModal: boolean;
}

const RoomOptionsModal:FC<RoomOptionsModalProps> = ({showModal, closeModal}) => {

  const [showBottomModal, setShowBottomModal] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

  return showModal ? (
    <>
      <BottomModal closeModal={() => closeModal(false)} title="Opções de grupo">
        <Button onPress={() => setShowCreateRoomModal(true)}>Criar grupo</Button>
        <Button type="secondary" onPress={() => setShowBottomModal(true)}>Entrar em um grupo</Button>
      </BottomModal>
      {showBottomModal && <JoinGroupModal closeModal={() => setShowBottomModal(false)}/>}
      {showCreateRoomModal && <CreateGroupModal closeModal={() => setShowCreateRoomModal(false)}/>}
    </>
  ) : null;
};

export default RoomOptionsModal;
