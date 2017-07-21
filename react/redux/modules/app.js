const initialState = {
  email: '',
  comment: '',
  controls: {
    email: '',
    name: '',
    taxNumber: '',
    password: '',
    passwordConfirmation: '',
    emailError: '',
    nameError: '',
    taxNumberError: '',
    passwordError: '',
    passwordConfirmationError: '',
    signInDialogOpen: false,
    signInPublicDialogOpen: false,
    signInConsulDialogOpen: false,
    notRegisteredModalOpen: false,
    registrationDialogOpen: false
  },
  hideFeedbackTab: false,
  feedbackClick: false,
  cuPopup: null,
  settings: {
    mainColor: 'white'
  },
  globalMessage: ''
};

const initialAction = '';

export default function reducer(state = initialState, action = initialAction) {
  switch (action.type) {
    default:
      return Object.assign({}, state);
  }
}

export function checkStep(step, tutorial) {
  return {
    type: CHANGE_TUTORIAL,
    tutorial
  };
}

