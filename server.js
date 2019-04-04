import app from './app'

app.set('port', 3003);

app.listen(app.get('port'), () => {
  console.log(`App is running on http://localhost:${app.get('port')}`)
})

app.get('/', (request, response) => {
  response.send('server is running');
});