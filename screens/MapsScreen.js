import React, {Component} from 'react';
import { ScrollView, StyleSheet, Dimensions, View, Image} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import MapView,{ Marker} from 'react-native-maps'
import firebase from 'firebase'

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE = 40.705;
const LONGITUDE = -74.009;
const LATITUDE_DELTA = 0.002;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapsScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    }
  }
  // componentDidMount(){
  //   console.log('running mapcourt')
  //   var ref = firebase.database().ref('courts')
  //   console.log(ref)
  //   ref.on('value', function(snapshot){
  //     console.log(snapshot.key)
  //   })
  // }

  render(){
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          zoomEnabled={true}
          scrollEnabled={true}
          showsScale={true}
        >
          <MapView.Marker
            coordinate={{latitude: 40.7222,
            longitude: -74.0051}}
            title={"Grand & Canal Courts"}
            description={"Grand & Canal Sts."}
          >
            <Image
            style = {{width: 50, height: 50}}
            source ={{uri: 'http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-File.png'}}/>
          </MapView.Marker>
          <MapView.Marker
            coordinate={{latitude: 40.6992,
            longitude: -73.9983}}
            title={"Brooklyn Bridge Park"}
            description={"Pier 2."}
          >
            <Image
            style = {{width: 50, height: 50}}
            source ={{uri: 'http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-File.png'}}/>
          </MapView.Marker>
          <MapView.Marker
            coordinate={{latitude: 40.7171,
            longitude: -74.012}}
            title={"Washington Market Park"}
            description={"Chambers St. between Greenwich St. and West St."}
            >
            <Image
            style = {{width: 50, height: 50}}
            source ={{uri: 'http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-File.png'}}/>
          </MapView.Marker>
        </MapView>
      </View>
    )
  }
}

MapsScreen.navigationOptions = {
  title: 'Maps',
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

 export default MapsScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
// });
