import createHttpError from 'http-errors';

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    // next(createHttpError(400, 'No file'));
    // return;
    throw createHttpError(400, 'No file');
  }
  res.status(200).json({ url: '' });
};
