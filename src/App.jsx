
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { NotesProvider } from "./context/NotesContext";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => window.history.pushState(null, "", to)}
    >
      <NotesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in/*" element={<SignIn />} />
            <Route path="/sign-up/*" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <SignedIn>
                  <Dashboard />
                </SignedIn>
              }
            />
            <Route
              path="/dashboard"
              element={
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              }
            />
          </Routes>
        </Router>
      </NotesProvider>
    </ClerkProvider>
  );
}

export default App;
