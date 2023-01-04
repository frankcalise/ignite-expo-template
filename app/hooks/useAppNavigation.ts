import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"

export function useAppNavigation() {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>()

  return navigation
}
