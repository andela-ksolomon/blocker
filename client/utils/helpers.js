export const validate = (state) => {
    const errors = {};
    let isValid = false;
    if (!(state.title.length >= 5)) {
      errors.title = 'Title should have a minimum of 5 characters';
    }
    if (!(state.content.length >= 5)) {
      errors.content = 'Content should have a minimum of 5 characters';
    }
    if (Object.keys(errors).length !== 0) {
      isValid = true;
    }
    return {
      errors,
      isValid
    };
  };
  export const getFirstLetter = (word) => {
    return word.split('')[0];
  };
  
  export const getDate = (date) => {
    return date.split('T')[0];
  };