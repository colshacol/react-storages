export default which => {
  return `with${which[0].toUpperCase()}${which.substr(1)}Storage`;
};
