import React, { FC, useCallback, useEffect, useMemo, useState} from 'react';
import { StyleSheet, ScrollView, View} from 'react-native';
import Button from '../../components/Button';
import GroupsList from '../../components/GroupsList';
import RoomOptionsModal from '../../components/RoomsOptionsModal';
import Text from '../../components/Text';
import useRoom from '../../contexts/RoomContext';

const Groups:FC = ({navigation}) => {

  const [showBottomModal, setShowBottomModal] = useState(false);
  const {getUserFavoriteRooms, isFavorited } = useRoom();

  const onGoToHomeButtonPress = () => {
    setShowBottomModal(true);
  };

  useEffect(() => {
    getUserFavoriteRooms();
  }, [isFavorited, getUserFavoriteRooms]);

  return (
    <>
      <ScrollView style={styles.groups}>
        <View style={styles.header}>
          <Text fontSize={28} weight="700">Grupos</Text>
          <Button buttonStyle={styles.button} size="small" type="secondary" onPress={onGoToHomeButtonPress}>Opções de grupos</Button>
        </View>
        <GroupsList/>
      </ScrollView>
      <RoomOptionsModal showModal={showBottomModal} closeModal={() => setShowBottomModal(false)}/>
    </>
  );
};

const styles = StyleSheet.create({
  groups: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 0,
    paddingVertical:0,
  },
});

export default Groups;
