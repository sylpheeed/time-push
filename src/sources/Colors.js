import Helpers from 'sources/helpers'

let _colors = [
  '#FF0000',
  '#FFC000',
  '#E0FF00',
  '#7EFF00',
  '#00FF9F',
  '#00FDFF',
  '#009FFF',
  '#003DFF',
  '#8300FF',
  '#E500FF',
  '#FF007C',
  '#527085'
];

let CachedColors = [];

export default {
  sample() {
    return _colors[Helpers.getRandom(0, _colors.length - 1)];
  },

  cleanCache(activeColor){
    CachedColors = [activeColor];
  },
  uniqueColor(){
    let color = this.sample();
    if (CachedColors.indexOf(color) >= 0) {
      return this.uniqueColor();
    }
    CachedColors.push(color);
    return color;
  }
}
