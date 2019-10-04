import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Button} from 'react-native';
import { ListItem } from 'react-native-elements'
import {FirebaseWrapper} from '../config/Firebase/firebase'

export default class PlayerListScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      players: {}
    }
    this.getPlayers = this.getPlayers.bind(this)
    this.addPlayer = this.addPlayer.bind(this)
  }
  componentDidMount(){
    this.getPlayers()
  }

  async getPlayers(){
    try {
      let marker = await FirebaseWrapper.GetInstance().getMarker(this.props.navigation.state.params.selected)
      if(marker.length > 0){
        this.setState({
          ...this.state, players: marker[0].players
        })
      }
    } catch (error) {
      console.log('something went wrong in player list',error)
    }
  }

  addPlayer(player){
    this.setState({...this.state, players: [...this.state.players, player]})
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <FlatList
          data={this.state.players}
          renderItem={({item}) =>
          <ListItem
          title={`${item}`}
          />}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          title='ADD'
          onPress={() => this.addPlayer('Allen')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
