import React, { FC } from 'react';
import { StyleSheet, ScrollView, View} from 'react-native';
import GroupsList from '../../components/GroupsList';
import Text from '../../components/Text';

const Groups:FC = () => {
  return (
    <View style={styles.groups}>
      <Text fontSize={28} weight="700">Grupos</Text>
      {/* <GroupsList /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  groups: {
    flex: 1,
    padding: 20,
  },
});

export default Groups;
