import React, { useEffect, useState } from 'react';
import { Frame } from '@/components/atoms/frame';
import InnerHeader from '@/components/molecules/header/inner';
import Separator from '@/components/atoms/separator';
import LocationMessages from '@/components/molecules/locationMessages';
import { sampleLocationMessages } from '@/lib/constants';
import DefaultSafeAreaView from '../../../atoms/defaultSaveAreaView/DefaultSafeAreaView';

export default function ReceivedText() {
  const [messages, setMessages] = useState([]);

  return (
    <DefaultSafeAreaView>
      <Frame>
        <InnerHeader label="Location Messages" gobackLabel="Back" />
        <Separator />
        <LocationMessages />
      </Frame>
    </DefaultSafeAreaView>
  );
}

// {locations.length > 0 ? (
//   <View>
//     <Text>My location</Text>
//     {/* <MapView
//     style={styles.map}
//     initialRegion={{
//       latitude: locations[0]?.latitude,
//       longitude: locations[0]?.longitude,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     }}
//   >
//     {locations.map((location, index) => (
//       <Marker
//         key={index}
//         coordinate={{
//           latitude: location.latitude,
//           longitude: location.longitude,
//         }}
//         title={location.name}
//         description={location.address}
//       />
//     ))}
//   </MapView> */}
//   </View>
// ) : (
//   <Text> Map display would be here</Text>
// )}
