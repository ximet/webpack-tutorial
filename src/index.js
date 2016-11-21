var app = document.getElementById('app');

app.innerHTML = '<p>Hello Replacement Module!!!</p>'

if (module.hot) {
  module.hot.accept();
}
