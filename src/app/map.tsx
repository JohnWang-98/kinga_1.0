import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {View, StyleSheet, Text} from 'react-native';

const MapScreen = ({route}) => {
  const {location} = route.params;

  return (
    <View style={styles.container}>
      <Text>{`Latitude: ${location.latitude}`}</Text>
      <Text>{`Longitude: ${location.longitude}`}</Text>
      {/* <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker coordinate={location} />
      </MapView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
