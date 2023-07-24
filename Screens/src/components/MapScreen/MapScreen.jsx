import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Dimensions, View } from "react-native";
import { useRoute } from "@react-navigation/native";

export const MapScreen = () => {
  const { params: { location = null } = {} } = useRoute();

  return (
    <View style={styles.containerMap}>
      <MapView
        style={styles.mapStyle}
        region={{
          location,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker title="I am here" coordinate={location} description="Hello" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMap: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
