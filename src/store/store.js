import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// Load vuex i18n module
import vuexI18n from 'vuex-i18n'

import getters from './getters'
import setters from './setters'
import mutations from './mutations'
import actions from './actions'

const store = new Vuex.Store({
  state: {
    language: 'en',
    search: {
      location: {
        lat: 51.1657,
        lng: 10.4515,
        name: '',
      },
      options: {
        categories: {},
        radius: 50 // in km
      }
    },
    images: [],
    groups: [
      {groupname: 'Rai Group', id: '1', description: 'Rai kirat group is an old group'},
      {groupname: 'Aryan Group', id: '2', description: 'Aryan group is a new group'},
      {groupname: 'Dharan Group', id: '3', description: 'Dharan group is very famous group'}
    ]
  },

  getters,
  setters,
  mutations,
  actions
})

// Initialize the internationalization plugin on the vue instance
Vue.use(vuexI18n.plugin, store)

const translationsEn = {
  'searchText': 'Enter location to search',
  'locationname':'Enter location name',
  'descriptiontext':'Write description about this image',
  'labelforimage':'Choose an image to upload',
  'labelfordescription':'Description',
  'labelforlocation':'Location',
  'labelforsubmit':'Submit',
  'labelforreset':'Reset',
  'labelforgroupname':'Group Name',
  'placeholderforgroupname':'Enter your Group Name',
  'labelforcreategroup':'Create Group'



}

// translations can be kept in separate files for each language
// i.e. resources/i18n/de.json.
const translationsDe = {
  'searchText': 'Geben Sie den zu suchenden Ort ein',
  'locationname': 'Geben Sie den Ortsnamen ein',
  'descriptiontext':'schreiben Sie eine Beschreibung über dieses Bild',
  'labelforimage':'Wähle ein Bild zum Hochladen aus',
  'labelfordescription':'Beschreibung',
  'labelforlocation':'Ort',
  'labelforsubmit':'Einreichen',
  'labelforreset': 'zurücksetzen',
  'labelforgroupname':'Gruppennamen',
  'placeholderforgroupname':'Geben Sie Ihre Gruppennamen',
  'labelforcreategroup':'Erstellen Gruppe'
}

// Add translations directly to the application
Vue.i18n.add('en', translationsEn)
Vue.i18n.add('de', translationsDe)

// Set English as the default locale
Vue.i18n.set('en')

export default store
