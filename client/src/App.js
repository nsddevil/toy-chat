import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import WithAuth from './components/hoc/WithAuth';
import Landing from './components/landing/Landing';
import SignupPage from './components/auth/SignupPage';
import SigninPage from './components/auth/SigninPage';
import HeaderPage from './components/header/HeaderPage';
import RoomPage from './components/chat/RoomPage';
import ChatPage from './components/chat/ChatPage';

function App() {
  return (
    <BrowserRouter>
      <HeaderPage />
      <main>
        <Switch>
          <Route path="/signin" component={WithAuth(SigninPage, false)} />
          <Route path="/signup" component={WithAuth(SignupPage, false)} />
          <Route exact path="/chat" component={WithAuth(RoomPage, true)} />
          <Route path="/chat/:roomId" component={WithAuth(ChatPage, true)} />
          <Route exact path="/" component={Landing} />
          <Redirect to="/" />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
