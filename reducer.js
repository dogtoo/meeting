export const initialState = {
  //System configuration
  orientation: {},
  auth: {
    user: {
      email: 'dogtoo.lin@gmail.com',
    },
  },

  //App configuration
  headHeight: 40,
  headBackgroundColor: '#fff',
  avatarSize: 50,

  //App status
  onSendUser: '',
  onShowToolBar: false,
  
  //Database
  message: [],
  connUsers: [
    {
      id: '1',
      name: 'user1',
      //image: '😀',
      onSend: false,
    },
    {
      id: '2',
      name: 'user2',
      //image: '🛴',
      onSend: false,
    },
    {
      id: '3',
      name: 'user3',
      //image: '👩‍🦰',
      onSend: false,
    },
    {
      id: '4',
      name: 'user4',
      //image: '🧓',
      onSend: false,
    },
    {
      id: '5',
      name: 'user5',
      //image: '👮‍♀️',
      onSend: false,
    },
  ],
};

const reducer = (state, action) => {
  //console.log(state)
  switch (action.type) {
    case 'TOOL_BAR_CLOSE':
      return { ...state, onShowToolBar: false };
    case 'TOOL_BAR_OPEN':
      return { ...state, onShowToolBar: true };
    case 'ON_LAYOUT':
      return { ...state, orientation: { ...action.payload } };
    case 'MESSAGE_LOAD':
      return { ...state, message: [...state.message, ...action.payload] };
    case 'MESSAGE_ADD':
      return { ...state, message: [...state.message, action.payload] };
    case 'LOGIN':
      return { ...state, auth: { ...action.payload } };
    case 'LOGOUT':
      return { ...state, auth: {} };
    case 'CONN_USER_TOUCH':
      return { ...state, onSendUser: action.payload };
    default:
      return state;
  }
};

export default reducer;
