import React from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

// CMP
import { AppSideBar } from "./cmps/AppSideBar";
import { AppFooter } from "./cmps/AppFooter";
import { PostIndex } from "./pages/PostIndex";
import { Explore } from "./pages/explore";
import { Message } from "./pages/Message";
import { Profile } from "./pages/Profile";
import { PostDetails } from "./cmps/PostDetails";

export function RootCmp() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-app">
          <AppSideBar />
          <section className="main-container">
            <main className="main-content">
              <Routes>
                <Route path="home" element={<PostIndex />}>
                  <Route path="p/:postId" element={<PostDetails />} />
                </Route>
                <Route path="explore" element={<Explore />} />
                <Route path="message" element={<Message />} />
                <Route path=":profile" element={<Profile />} />
              </Routes>
            </main>
            <AppFooter />
          </section>
        </section>
      </Router>
    </Provider>
  );
}
