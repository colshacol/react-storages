export default (storage, props, mapper) => {
  return {
    ...props,
    ...mapper(storage, props)
  };
};
