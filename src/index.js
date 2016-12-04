import { sum } from './mathService.js';
var app = document.getElementById('app');

//ex. lambda
const summa = () => ( sum(2,3) )

app.innerHTML = `<p>Hello Replacement Module!!! My sum 2+3: ${summa()}</p>`

if (module.hot) {
  module.hot.accept();
}
