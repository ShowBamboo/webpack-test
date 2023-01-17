import './index.css'
import './1.scss'

const obj = {
  a: 1,
  b: 2
}
const { a, b } = obj
console.log(a);
// const qgh = 'qgh111111'
// const foo = () => {
//   console.log('foo');
// }
// foo()
// console.log('index323213131');
// console.log(qgh);

// var PSD = require('psd');
// console.log(PSD);
// var psd = PSD.fromFile("../public/111.psd");
// psd.parse();

// console.log(psd.tree().export());
// console.log(psd.tree().childrenAtPath('A/B/C')[0].export());

// You can also use promises syntax for opening and parsing
// PSD.open("../public/111.psd").then(function (psd) {
//   return psd.image.saveAsPng('./output.png');
// }).then(function () {
//   console.log("Finished!");
// });
