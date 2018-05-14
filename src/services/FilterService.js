import Vue from 'vue'

// localString
Vue.filter('localString', value => {

  try {
    return (value)
      ? value.toLocaleString()
      : value
  }
  catch (error) {
    console.log('filter [localString]: ' + error)
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
