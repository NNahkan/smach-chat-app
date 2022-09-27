import "./App.css";
import React, { useState, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
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

const PrivateRoute = ({ ...props }) => {
  const context = useContext(UserContext);
  return context.authService.isLoggedIn ? (
    <Outlet context={{ ...props }} />
  ) : (
    <Navigate context={{ ...props }} to="/login" />
  );
  /*  <Route
      {...props}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Navigate to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    /> */
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AuthProvider>
  );
}

{
  /* <nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/register">Register</Link>
					</li>
				</ul>
			</nav> */
}

export default App;
