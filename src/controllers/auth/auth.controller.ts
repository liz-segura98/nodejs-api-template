import { Request, Response } from 'express';

const registerUser = async (req: Request, res: Response) => {
  res.json({
    Title: 'Hola mundo usando rutas!',
  });
};

export default {
  registerUser,
};
