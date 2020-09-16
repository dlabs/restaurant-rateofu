import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import 'firebase/analytics'
import config from '../config/firebase'

//firebase app init
firebase.initializeApp(config)

// exports
export default firebase
export const db = firebase.firestore()
export const functions = firebase.functions()

//DEV ENV OVERRIDES
// instead od checking for NODE_ENV we check browser hostname, so this way we connect WEB app to emulators on localhost
// by default, but we still let local app to connect to production if user changes app hostname.
// To change hostname for local app, one needs to run "react-scripts test" with environment variable HOST set to new
// hostname (like HOST="new.localhost"). Don't forget to add an entry "127.0.0.1 new.localhost" to your local hosts file
// if (process.env.NODE_ENV === 'development') {
if (window.location.hostname === 'localhost') {
  //FUNCTIONS emulator
  functions.useFunctionsEmulator('http://localhost:5001')

  //FIRESTORE emulator
  db.settings({
    host: 'localhost:8080',
    ssl: false,
    // workaround for cypress timing out for firebase requests
    // https://github.com/cypress-io/cypress/issues/2374#issuecomment-587688968
    experimentalForceLongPolling: true,
  })
}
