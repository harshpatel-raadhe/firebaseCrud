import React from 'react';

export const AuthContext = React.createContext({
  Login: res => {},
  LogOut: () => {},
});
