import React from "react"
import { TextStyle, View, ViewStyle, Alert } from "react-native"
import * as Updates from "expo-updates"
import { Button, Screen, Text } from "../components"
import { spacing } from "../theme"
import { AppStackScreenProps } from "../navigators"
import { useAppNavigation } from "../hooks"

export const UpdateScreen: React.FunctionComponent<AppStackScreenProps<"Update">> =
  function UpdateScreen(_props) {
    const navigation = useAppNavigation()

    const [isLoading, setIsLoading] = React.useState(false)

    const restart = async () => await Updates.reloadAsync()

    React.useEffect(() => {
      async function downloadAppUpdate() {
        setIsLoading(true)
        try {
          // do a check for updates here again due to navigation state being persisted
          // or first go back from this screen so app restarts in the proper spot
          const results = await Updates.checkForUpdateAsync()
          if (!results.isAvailable) {
            navigation.goBack()
            return
          }

          // Continue with grabbing updates
          const fetchedUpdateResult = await Updates.fetchUpdateAsync()
          setIsLoading(false)

          if (fetchedUpdateResult.isNew) {
            Alert.alert(
              "Update Successful",
              "Now that the updates are done, the app will restart to use the latest version.",
              [{ text: "Restart", onPress: restart }],
            )
          } else {
            Alert.alert(
              "No Update Available",
              `Your app is up-to-date with the current version: v${Updates.runtimeVersion}.`,
            )
          }
        } catch (error) {
          setIsLoading(false)
          console.log("Error downloading update: ", error)
        }
      }

      downloadAppUpdate()
    }, [])

    return (
      <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
        <Text style={$title} preset="heading" tx="updateScreen.title" />

        {isLoading && <Text>Downloading update...</Text>}

        <View style={$buttonContainer}>
          <Button style={$button} tx="common.back" onPress={navigation.goBack} />
        </View>
      </Screen>
    )
  }

const $container: ViewStyle = {
  paddingBottom: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $title: TextStyle = {
  marginBottom: spacing.huge,
}

const $button: ViewStyle = {
  marginBottom: spacing.extraSmall,
}

const $buttonContainer: ViewStyle = {
  marginTop: spacing.huge * 2,
  marginBottom: spacing.medium,
}
