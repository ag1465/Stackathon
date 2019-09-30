import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from './ApiKeys'

export class FirebaseWrapper {
  constructor() {
    this.initialized = false;
    this._firebaseInstance = null; // instance of our npm package
    this._firebaseWrapperInstance = null; // instance of our wrapper
    this._firestore = null;
  }

  Initialize() {
    if (!this.initialized) {

      // initialize firebase
      this._firebaseInstance = firebase.initializeApp(firebaseConfig.FirebaseConfig)
      this._firestore = firebase.firestore();
      this.initialized = true;
      console.log('It worked! :D')
    }
    else {
      console.log('already initialized!')
    }
  }

  static GetInstance() {
    if (null == this._firebaseWrapperInstance) {
      this._firebaseWrapperInstance = new FirebaseWrapper()
    }
    else {
      // Already initialized, nothing more to do here
    }

    return this._firebaseWrapperInstance;
  }

  async getMarkers(){
    try {
      let markers = []
      await this._firestore.collection('courts').get()
            .then(function(snapshot){
              snapshot.forEach(function(doc){
                // console.log(doc.data)
                markers.push({id: doc.id, ...doc.data()})
          })
        })
      return markers
    } catch (error) {
      console.log('something went wrong in database for getmarkers ', error)
    }

  }
  async getMarker(doc){
    try {
      let marker = []
      await this._firestore.collection('courts').where('longitude', '==', doc.longitude).where('latitude', '==', doc.latitude).get()
            .then(function(snapshot){
              snapshot.forEach(function(doc){
                // console.log(doc.data)
                marker.push({id: doc.id, ...doc.data()})
          })
        })
      return marker
    } catch (error) {
      console.log('something went wrong in database for getmarker ', error)
    }

  }
  // async CreateNewDocument(collectionPath, doc) {
  //   try {
  //     const ref = this._firestore.collection(collectionPath).doc()

  //     const timestamp = firebase.firestore.Timestamp.now().toDate()
  //     return await ref.set({ ...doc, createdAt: timestamp, id: ref.id })
  //   } catch (error) {
  //     console.log('something went wrong :/ ', error)
  //   }
  // }

  async SetupCollectionListener( name, callback) {
    try {
      console.log('calling SetupCollectionListener')
      await this._firestore.collection("Washington Market Park Board").onSnapshot(querySnapshot => {
        let container = []
        // console.log(querySnapshot)
        querySnapshot.forEach(doc => {
          // console.log(doc.data())
          container.push({...doc.data(), id: doc.id})
        })
        return callback(container)
      })
    } catch (error) {
      console.log('oh no! something went bad :( !', error)
    }
  }
}


