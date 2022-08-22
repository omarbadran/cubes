import { App } from '@tinyhttp/app';

const app = new App();

app.get('/', (req, res) => {
  res.send({ hello: 'world' });
});

app.listen(8080);
