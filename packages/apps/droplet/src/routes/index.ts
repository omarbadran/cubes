import { Handler } from '@tinyhttp/app';

export const get: Handler = (req, res) => {
  res.send({
    version: 55555555
  });
};
