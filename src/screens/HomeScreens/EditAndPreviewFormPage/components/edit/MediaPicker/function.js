const uploadFile = async (files = [], uploadFileMutate) => {
  if (!files.length) return;

  return await uploadFileMutate({ data: files });
};

export default uploadFile;
