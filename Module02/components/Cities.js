import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
const Item = (props) => {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() =>
        props.setMyLocation({
          city: props.name,
          country: props.country,
          state: props.zone,
          timezone: props.timezone,
          lt: props.latitude,
          lg: props.longitude,
        })
      }
    >
      <Image
        source={{
          uri: `https://flagsapi.com/${props.code.toUpperCase()}/shiny/64.png`,
        }}
        style={{ width: 40, height: 40 }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 17 }}>{props.name}</Text>
      <Text>{props.country}</Text>
      <Text>{props.zone}</Text>
    </TouchableOpacity>
  );
};
const Cities = ({ array, visible, setMyLocation }) => {
  return (
    <View style={styles.cities}>
      {visible && (
        <FlatList
          data={array}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              country={item.country}
              code={item.country_code}
              zone={item.admin1}
              timezone={item.timezone}
              setMyLocation={setMyLocation}
              latitude={item.latitude}
              longitude={item.longitude}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  cities: {
    position: "absolute",
    top: "100%",
    width: "100%",
    backgroundColor: "#fff",
    height: "auto",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    gap: 10,
  },
});
export default Cities;
