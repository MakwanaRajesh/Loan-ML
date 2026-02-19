import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import History from "./pages/History";
import About from "./pages/About";
import Help from "./pages/Help";
import Contact from "./pages/Contact";

const API = "http://localhost:5000";

export default function App() {
  const [page, setPage]   = useState("landing");
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("lp_token") || "");

  useEffect(() => {
    if (!token) return;
    fetch(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.id) {
          setUser(data);
          setPage("dashboard");
        } else {
          doLogout();
        }
      })
      .catch(doLogout);
  }, []);

  const doLogin = (tk, usr) => {
    localStorage.setItem("lp_token", tk);
    setToken(tk);
    setUser(usr);
    setPage("dashboard");
  };

  const doLogout = () => {
    localStorage.removeItem("lp_token");
    setToken("");
    setUser(null);
    setPage("landing");
  };

  const nav = (p) => setPage(p);
  const shared = { nav, user, token, logout: doLogout };

  return (
    <>
      {page === "landing"   && <Landing   {...shared} login={doLogin} />}
      {page === "login"     && <Login     {...shared} login={doLogin} />}
      {page === "register"  && <Register  {...shared} login={doLogin} />}
      {page === "dashboard" && <Dashboard {...shared} />}
      {page === "predict"   && <Predict   {...shared} />}
      {page === "history"   && <History   {...shared} />}
      {page === "about"     && <About     {...shared} />}
      {page === "help"      && <Help      {...shared} />}
      {page === "contact"   && <Contact   {...shared} />}
    </>
  );
}
