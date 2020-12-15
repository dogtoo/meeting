export const initialState = {
  //System configuration
  orientation: {},
  auth: {
    user: {
      email: 'dogtoo.lin@gmail.com',
      logo: 'https://img.icons8.com/bubbles/344/mac-os.png',
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
  message: [
    {
      user: 'dogtoo1',
      message: 'hello dogtoo.lin@gmail.com',
      logo: 'https://img.icons8.com/bubbles/344/ibooks.png',
    },
    {
      user: 'dogtoo.lin@gmail.com',
      message: 'Im dogtoo.lin@gmail.com',
      logo: 'https://img.icons8.com/bubbles/344/chrome.png',
    },
    {
      user: 'dogtoo1',
      message: 'hello dogtoo.lin@gmail.com long time no see',
      logo: 'https://img.icons8.com/bubbles/344/ibooks.png',
      to: { id: 1, logo:'https://img.icons8.com/bubbles/344/chrome.png'},
    },
  ],
  connUsers: [
    {
      id: '1',
      name: 'apple',
      logo: 'https://img.icons8.com/bubbles/344/mac-os.png',
      onSend: false,
    },
    {
      id: '2',
      name: 'youtue',
      logo: 'https://img.icons8.com/bubbles/344/youtube-squared.png',
      onSend: false,
    },
    {
      id: '3',
      name: 'maps',
      logo: 'https://img.icons8.com/bubbles/344/apple-map.png',
      onSend: false,
    },
    {
      id: '4',
      name: 'ios',
      logo: 'https://img.icons8.com/bubbles/344/ios-photos.png',
      onSend: false,
    },
    {
      id: '5',
      name: 'photo',
      logo: 'https://img.icons8.com/bubbles/344/adobe-photoshop.png',
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
