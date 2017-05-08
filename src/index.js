import { sum } from './mathService.js';
const app = document.getElementById('app');
require("./style.scss");
require("../template/row.html");
//ex. lambda
const summa = () => ( sum(2,3) )

app.innerHTML = `<p>Hello Replacement Module!!! My sum 2+3: ${summa()}</p>`

if (module.hot) {
  module.hot.accept();
}
