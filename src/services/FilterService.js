import Vue from 'vue'
import moment from 'moment'

// localeString
Vue.filter('localeString', value => {

  try {
    return (value)
      ? value.toLocaleString()
      : value
  }
  catch (error) {
    console.log('filter [localeString]: ' + error)
    return value
  }

})

// titleCase
Vue.filter('titleCase', value => {

  try {
    return (value)
      ? value.replace(/\w\S*/g, txt => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
      : value
  }
  catch (error) {
    console.log('filter [titleCase]: ' + error)
    return value
  }

})

// replaceUnderscores
Vue.filter('replaceUnderscores', value => {

  try {
    return (value && value.length > 0)
      ? value.replace(/_/g, ' ')
      : value
  }
  catch (error) {
    console.log('filter [replaceUnderscores]: ' + error)
    return value
  }

})

// upperCase
Vue.filter('upperCase', value => {

  try {
    return (value)
      ? value.toUpperCase()
      : value
  }
  catch (error) {
    console.log('filter [upperCase]: ' + error)
    return value
  }

})

// date to MMM DD, YYYY
Vue.filter('date', value => {

  try {
    return (value)
      ? moment(value).format('MMM DD, YYYY')
      : value
  }
  catch (error) {
    console.log('filter [date]: ' + error)
    return value
  }

})
