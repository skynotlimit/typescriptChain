import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_key = "3ffe956748ed0f83dd3b59591ef4f7de";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Rain: "rains",
  Drizzle: "rain",
  Snow: "snows",
};

export default function App() {
  const [ok, setOk] = useState(true);
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);

  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_key}`
    );
    const json = await response.json();
    setDays(json.daily);
  };

  useEffect(() => {
    ask();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 50 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  width: "90%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={40}
                  color="white"
                />
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  city: {
    flex: 2,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "white",
    fontSize: 60,
    fontWeight: 600,
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  temp: {
    marginTop: -20,
    color: "black",
    fontSize: 120,
    fontWeight: 600,
  },
  description: {
    marginTop: -50,
    color: "black",
    fontSize: 60,
    fontWeight: 600,
  },
  tinyText: {
    fontSize: 20,
  },
});
