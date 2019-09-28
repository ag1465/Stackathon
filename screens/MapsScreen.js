import React, {Component} from 'react';
import { ScrollView, StyleSheet, Dimensions, View, Image} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import MapView,{ Marker} from 'react-native-maps'
import {FirebaseWrapper} from '../config/Firebase/firebase'

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
      user: {},
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: {all: [], selected:{}}
    }
    this.getMarker = this.getMarker.bind(this)
    this.markerClick = this.markerClick.bind(this)
  }
  componentDidMount(){
    console.log('b component')
    this.getMarker()
    console.log('a component')
  }
  async getMarker() {
    try {
      console.log('before marker')
      let markers = await FirebaseWrapper.GetInstance().getMarkers()
      console.log('got marker', markers)
      if(markers.length > 0){
        this.setState({
          ...this.state, markers: {...this.state.markers, all: markers}
        })
      }
      console.log('state marker', this.state.markers.all)
    } catch (error) {
      console.log(error)
    }
  }

  markerClick(){
    console.log('clicked')
  }

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
          {
          this.state.markers.all.map(mark => {return(
            // mark.player? markdescription = mark.player.length > 0 ? `${mark.description} \n ${mark.player}` : mark.description : '',

            <MapView.Marker key={mark.id}
              coordinate={{latitude: mark.latitude,
              longitude: mark.longitude}}
              title={mark.title}
              description = {mark.description}
              onPress={() => this.markerClick()}
              >
              <Image
              style = {{width: 50, height: 50}}
              source ={{uri: 'http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-File.png'}}/>
            </MapView.Marker>
          )})
          }
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
