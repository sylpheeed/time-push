import Helpers from 'sources/helpers'

let _colors = [
  '#FF0000',
  '#FFC000',
  '#E0FF00',
  '#7EFF00',
  '#21FF00',
  '#00FF41',
  '#00FF9F',
  '#00FDFF',
  '#009FFF',
  '#003DFF',
  '#2100FF',
  '#8300FF',
  '#E500FF',
  '#0052FF',
  '#FF007C',
  '#1000FF'
];


class Colors {
  sample() {
    return _colors[Helpers.getRandom(0, _colors.length - 1)];
  }
}


export default new Colors()
