import "./App.css";
import React, { useState, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import ChatApp from "./components/ChatApp/ChatApp";
import UserLogin from "./components/UserLogin/UserLogin";
import UserCreate from "./components/UserCreate/UserCreate";
import { AuthService } from "./services";

const authService = new AuthService();
export const UserContext = createContext();
const AuthProvider = ({ children }) => {
  const context = {
    authService,
    // messageService,
    appSelectedChannel: {},
    appSetChannel: (ch) => {
      setAuthContext({ ...authContext, appSelectedChannel: ch });
      // update messageService selectedChannel,
    },
  };

  const [authContext, setAuthContext] = useState(context);

  return (
    <UserContext.Provider value={authContext}>{children}</UserContext.Provider>
  );
};

const PrivateRoute = ({...props}) => {
  const location = useLocation();
  const context = useContext(UserContext)
  return (
	context.authService.isLoggedIn ? <Outlet/> : <Navigate  to='login' state={{ prevPath: location.pathname}}/>
  )
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserCreate />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<ChatApp />} />
          </Route>

          {/* <Route
            path="/"
            element={
              <PrivateRoute>
                <ChatApp />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

 

export default App;
