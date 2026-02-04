import createHttpError from 'http-errors';

export const updateUserAvatar = async (req, res) => {
  // 1. Виводимо об'єкт req.file у консоль (термінал)
  console.log('--- Multer File Object ---');
  console.log(req.file);
  console.log('--------------------------');
  if (!req.file) {
    // next(createHttpError(400, 'No file'));
    // return;
    throw createHttpError(400, 'No file');
  }
  res.status(200).json({ url: '' });
};
