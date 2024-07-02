import { Request, Response } from 'express';

const registerUser = async (req: Request, res: Response) => {
  const { i18n } = res.locals;
  
  res.json(i18n.__('test'));
};

export default {
  registerUser,
};
