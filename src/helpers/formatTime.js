export const formatTime = (time) => {
  return new Date(time).toJSON().slice(0, 10).split("-").reverse().join("/");
};
