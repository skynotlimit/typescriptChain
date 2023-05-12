import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import { theme } from "./colors";
import { Touchable } from "react-native";
export default function App() {
  //현재 탭의 상태
  const [work, setWork] = useState(true);
  //입력한 텍스트 상태관리
  const [text, setText] = useState("");

  //todo리스트 관리(해시맵을 만들기 위해 []가 아닌 {}를 사용)
  const [todo, setTodo] = useState({});

  //현재 탭 상태 변경함수
  const travel = () => {
    setWork(false);
  };
  const working = () => {
    setWork(true);
  };
  const onChangeText = (e) => {
    setText(e);
  };
  const addTodo = () => {
    if (text === "") {
      return;
    }
    setText("");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={working}>
          <Text style={{ ...styles.btnText, color: work ? "white" : "black" }}>
            DevelopTime!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnText, color: work ? "black" : "white" }}>
            PlayTime!
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.input}
          value={text}
          returnKeyType="done"
          onSubmitEditing={addTodo}
          onChangeText={onChangeText}
          placeholder={work ? "Add a To do" : "Add Play"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.grey,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 40,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 30,
    fontSize: 18,
  },
});
