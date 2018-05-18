import ColorJSON from '@/assets/tokens/tokens.raw.json'

function getRawColors () {
  return JSON.parse(JSON.stringify(ColorJSON.props))
}

function reduceColorObject (colors, category = 'base-color', cb, initialValue) {

  return Object
    .keys(colors)
    .filter(color => colors[color].category === category)
    .reduce(cb, initialValue)

}


// get chart colors
let getColors = (category = 'base-color') => {

  let rawColors = getRawColors()

  return reduceColorObject(rawColors, category, (res, key) => {

    let colorName = key.split('-')[1]

    !res[colorName]
      ? res[colorName] = [rawColors[key].value]
      : res[colorName].push(rawColors[key].value)

    return res
  }, {})
}

// get color names
let getColorNames = (category = 'base-color') => {

  return reduceColorObject(getRawColors(), category, (res, key) => {

    let colorName = key.split('-')[1]

    if (!res.includes(colorName)) {
      res.push(colorName)
    }

    return res
  }, [])

}

export default {
  getColors,
  getColorNames
}
