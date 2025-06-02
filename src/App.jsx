// src/App.jsx
import { SignIn, SignUp, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function App() {
  return (
      <div>
            <h1>Welcome to My Clerk App</h1>

                  <SignedOut>
                          <SignIn />
                                </SignedOut>

                                      <SignedIn>
                                              <p>You're signed in!</p>
                                                     {/*<UserButton />*/}
                                                            </SignedIn>
                                                                </div>
                                                                  );
                                                                  }

                                                                  export default App;