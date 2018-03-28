import ColorJSON from '@/assets/tokens/tokens.raw.json'

let getColors = () => {

  let colorObject = {}
  let colorProps = JSON.parse(JSON.stringify(ColorJSON.props))

  for (let color in colorProps) {

    let colorValue = colorProps[color]
    if (colorValue.category === 'base-color') {

      let colorNameArray = color.split('-')
      let colorName = colorNameArray[1]
      // let colorModifier = colorNameArray[2]

      if (!colorObject[colorName]) {
        colorObject[colorName] = [colorValue.value]
      }
      else {
        colorObject[colorName].push(colorValue.value)
      }
    }
  }

  return colorObject
}

export default {
  getColors
}
