import React from "react"
import { Pressable, View, ViewStyle, TextStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors, spacing } from "../theme"
import { Text } from "./Text"

export function Banner({ children, action, visible }) {
  const { top } = useSafeAreaInsets()
  return (
    <View style={[$container, { top }, !visible && { display: "none" }]}>
      <View style={$row}>
        <View>
          <Pressable onPress={action.onPress}>
            <Text preset="heading" style={$actionText}>
              {action.title}
            </Text>
            <Text>{children}</Text>
            <View style={$action}></View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const $row: ViewStyle = {
  flexDirection: "row",
}

const $action: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-end",
  marginTop: 12,
}

const $actionText: TextStyle = {
  fontSize: 18,
}

const $container: ViewStyle = {
  backgroundColor: colors.palette.accent100,
  padding: spacing.medium,
  position: "absolute",
  left: 0,
  right: 0,
}
