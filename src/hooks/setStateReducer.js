const setStateReducer = (prevState, updatedProperties) => ({
  ...prevState,
  ...updatedProperties,
});

export default setStateReducer;
