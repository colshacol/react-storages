import mems from 'mems'

export default which => {
  const eventName = `${which}StorageChanged`;
  return handler => {
    window.addEventListener(eventName, handler);

    return () => {
      window.removeEventListener(eventName, handler);
    };
  };
}
