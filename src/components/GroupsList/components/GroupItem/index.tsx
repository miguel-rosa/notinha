import React, { FC, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import useRoom from "../../../../contexts/RoomContext";
import BottomModal from "../../../BottomModal";
import Button from "../../../Button";
import Checkbox from "../../../Checkbox";
import IconTrash from "../../../Icons/IconTrash";
import Text from "../../../Text";

type GroupItemProps = {
  id: string;
  text: string;
  checked: boolean;
}

const GroupItem: FC<GroupItemProps> = ({ id, text, checked }) => {
  const { getRoom } = useRoom();

  const onGroupPress = () => {
    getRoom()
  }

  return (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={onGroupPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  groupItem: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,

  },
  text: {
    marginLeft: 10
  }
})

export default GroupItem;