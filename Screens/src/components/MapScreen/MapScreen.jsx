// import MapView, { Marker } from "react-native-maps";
// import { useState } from "react";

// export const MapScreen = () => {
//   const [showMap, setShowMap] = useState(false);

//   return(
//     {showMap && (
//       <View style={style.containerMap}>
//         <MapView
//           style={style.mapStyle}
//           region={{
//             ...location,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           showsUserLocation={true}
//         >
//           {location && (
//             <Marker
//               title="I am here"
//               coordinate={location}
//               description="Hello"
//             />
//           )}
//         </MapView>
//       </View>
//     )}
//   )
// };
