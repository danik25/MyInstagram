import React from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

// CMP
import { AppSideBar } from "./cmps/AppSideBar";
import { AppFooter } from "./cmps/AppFooter";
import { HomeIndex } from "./pages/HomeIndex";
import { Explore } from "./pages/explore";
import { Message } from "./pages/Message";
import { Profile } from "./pages/Profile";

export function RootCmp() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-app">
          <AppSideBar />
          <section className="right-section">
            <main className="main-container">
              <Routes>
                <Route path="home" element={<HomeIndex />} />
                <Route path="explore" element={<Explore />} />
                <Route path="message" element={<Message />} />
                <Route path="profile" element={<Profile />} />
              </Routes>
            </main>
            <AppFooter />
          </section>
        </section>
      </Router>
    </Provider>
  );
}
