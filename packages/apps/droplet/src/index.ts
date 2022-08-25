import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { onError, noMatchHandler } from './errors/handle';

const app = new App({
  onError,
  noMatchHandler
});

const port = process.env?.PORT || '8080';

app.use(cors());

app.get('/', (req, res) => {
  res.send({ hello: 'world' });
});

app.listen(parseInt(port), () => {
  console.log(`Server listening at port: ${port}`);
});
