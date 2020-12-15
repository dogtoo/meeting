import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { useHistory, BackButton } from 'react-router-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { useStateValue } from './Auth';

export default function Equipment() {
  const [{ orientation }, dispatch] = useStateValue();
  const history = useHistory();
  //console.log(history);
  console.log('Equipment:', orientation);

  const styles = StyleSheet.create({
    mapStyle: {
      width: orientation.screenWidth,
      height: orientation.screenHeight,
    },
  });

  const ASPECT_RATIO = orientation.screenWidth / orientation.screenHeight;
  const LATITUDE = 24.932308;
  const LONGITUDE = 121.36759;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  /*const [coordinate, setCoordinate] = useState(new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
      }));*/

  const [region, setRegion] = useState({
    latitude: 24.926659,
    longitude: 121.344864,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0221,
  });

  const [camera, setCamera] = useState({
    center: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    pitch: 0.0322,
    heading: 0.0421,

    // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
    //altitude: 1,

    // Only when using Google Maps.
    //zoom: 1
  });

  const [markers, setMarkers] = useState([
    { latlng: { latitude: 24.932308, longitude: 121.36759, }, title: '2020-04-19T02:28:36Z', },
    //{latlng: {latitude: 24.931305, longitude: 121.35537,},title:'2020-04-19T02:53:36Z',},
    //{latlng: {latitude: 24.931206, longitude: 121.354904,},title:'2020-04-19T03:00:04Z',},
    { latlng: { latitude: 24.93112, longitude: 121.35468, }, title: '2020-04-19T03:01:44Z', },
    //{latlng: {latitude: 24.9311, longitude: 121.35465,},title:'2020-04-19T03:03:02Z',},
    { latlng: { latitude: 24.930904, longitude: 121.35339, }, title: '2020-04-19T03:06:39Z', },
    //{latlng: {latitude: 24.930727, longitude: 121.353195,},title:'2020-04-19T03:08:15Z',},
    //{latlng: {latitude: 24.930117, longitude: 121.35245,},title:'2020-04-19T03:10:15Z',},
    { latlng: { latitude: 24.929802, longitude: 121.351974, }, title: '2020-04-19T03:12:21Z', },
    //{latlng: {latitude: 24.92919, longitude: 121.35148,},title:'2020-04-19T03:14:54Z',},
    //{latlng: {latitude: 24.927935, longitude: 121.35043,},title:'2020-04-19T03:20:33Z',},
    { latlng: { latitude: 24.927902, longitude: 121.35042, }, title: '2020-04-19T03:24:50Z', },
    //{latlng: {latitude: 24.927837, longitude: 121.35031,},title:'2020-04-19T03:25:28Z',},
    //{latlng: {latitude: 24.927689, longitude: 121.35013,},title:'2020-04-19T03:26:46Z',},
    { latlng: { latitude: 24.927368, longitude: 121.34907, }, title: '2020-04-19T03:30:13Z', },
    //{latlng: {latitude: 24.927618, longitude: 121.34682,},title:'2020-04-19T03:37:13Z',},
    //{latlng: {latitude: 24.926659, longitude: 121.34566,},title:'2020-04-19T03:50:39Z',},
    { latlng: { latitude: 24.926735, longitude: 121.34562, }, title: '2020-04-19T03:51:16Z', },
    //{latlng: {latitude: 24.92674, longitude: 121.3455,},title:'2020-04-19T03:52:53Z',},
    //{latlng: {latitude: 24.926647, longitude: 121.345116,},title:'2020-04-19T03:54:49Z',},
    { latlng: { latitude: 24.926409, longitude: 121.344864, }, title: '2020-04-19T03:57:08Z', },
    //{latlng: {latitude: 24.924686, longitude: 121.34326,},title:'2020-04-19T04:04:23Z',},
    //{latlng: {latitude: 24.9245, longitude: 121.34278,},title:'2020-04-19T04:06:05Z',},
    //{latlng: {latitude: 24.924128, longitude: 121.342255,},title:'2020-04-19T04:07:55Z',},
    { latlng: { latitude: 24.923147, longitude: 121.341125, }, title: '2020-04-19T04:11:27Z', },
    //{latlng: {latitude: 24.923195, longitude: 121.34085,},title:'2020-04-19T04:13:00Z',},
    { latlng: { latitude: 24.92331, longitude: 121.34079, }, title: '2020-04-19T04:15:14Z', },
    { latlng: { latitude: 24.923132, longitude: 121.34102, }, title: '2020-04-19T04:18:13Z', },
    //{latlng: {latitude: 24.922455, longitude: 121.33956,},title:'2020-04-19T04:21:54Z',},
    { latlng: { latitude: 24.92136, longitude: 121.33957, }, title: '2020-04-19T04:26:26Z', },
    //{latlng: {latitude: 24.921276, longitude: 121.33975,},title:'2020-04-19T04:27:26Z',},
    { latlng: { latitude: 24.920307, longitude: 121.33952, }, title: '2020-04-19T04:30:51Z', },
    { latlng: { latitude: 24.920334, longitude: 121.339455, }, title: '2020-04-19T04:31:19Z', },
    //{latlng: {latitude: 24.918577, longitude: 121.33855,},title:'2020-04-19T04:38:37Z',},
    { latlng: { latitude: 24.918219, longitude: 121.33693, }, title: '2020-04-19T04:46:21Z', },

  ]);

  const goBack = () => {
    history.goBack();
    console.log('goBack');
  };

  function onRegionChange(region) {
    setRegion({ region });
  }

  return (
    <View>
      <View>
        <Button onPress={() => goBack()} title="go Back" />
      </View>
      <MapView
        style={styles.mapStyle}
        region={region}
        onRegionChange={this?.onRegionChange}>
        {markers.map((marker, index) => (
          <Marker
            draggable
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
}
