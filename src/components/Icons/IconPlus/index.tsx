import React, { FC } from "react";
import { Feather } from '@expo/vector-icons'

type IconPlusProps = {
  color?: "string",
  size ?: number
}

const IconPlus:FC<IconPlusProps> = ({color="white", size=24}) => {
  return (
    <Feather name="plus" size={size} color={color} />
  )
}

export default IconPlus;