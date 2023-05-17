import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
} from "react-native";
import { theme } from "./colors";
const storage_key = "@toDos";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const addTodo = async () => {
    if (text === "") {
      return;
    }
    const newTodo = { ...todo, [Date.now()]: { text, work } };
    setText("");
    setTodo(newTodo);
    await saveTodos(newTodo);
  };

  const saveTodos = async (toSave) => {
    const str = JSON.stringify(toSave);
    //작성한 리스트를 저장(앱을 다시 켜도 남아있도록)
    await AsyncStorage.setItem(storage_key, str);
  };
  const loadTodos = async () => {
    try {
      const s = await AsyncStorage.getItem(storage_key);
      setTodo(JSON.parse(s));
    } catch (e) {
      alert("불러오기 실패");
    }
  };
  const deleteTodo = (key) => {
    Alert.alert("Delete ToDo", "are u sure?", [
      { text: "CANCEL" },
      {
        test: "OK",
        onPress: () => {
          //얕은 복사로 같은 내용의 새로운 복사본을 만들고 거기서 특정 요소만 delete한다.
          const newTodo = { ...todo };
          delete newTodo[key];
          //state가 수정되고 나서 set함수로 변경된다.
          setTodo(newTodo);
          saveTodos(newTodo);
        },
      },
    ]);
  };
  useEffect(() => {
    loadTodos();
  }, []);

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
        <ScrollView>
          {Object.keys(todo).map((key) =>
            todo[key].work === work ? (
              <View style={styles.todo} key={key}>
                <Text style={styles.todoText}>{todo[key].text}</Text>
                <TouchableOpacity onPress={() => deleteTodo(key)}>
                  <MaterialIcons name="cancel" size={24} color="orange" />
                </TouchableOpacity>
              </View>
            ) : null
          )}
        </ScrollView>
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
  todo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: "gray",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  todoText: {
    color: "white",
    fontSize: 23,
    fontWeight: "600",
  },
});
