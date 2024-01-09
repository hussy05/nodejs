exports.catchError = async (cb) => {
  try {
    return await cb();
  } catch (error) {
    console.log(error);
    return { error };
  }
};
