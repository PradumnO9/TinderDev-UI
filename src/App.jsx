import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Body from "./components/Body";
import Login from "./components/Login";
import appStore from "./redux/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import UserConnections from "./components/UserConnections";
import Requests from "./components/Requests";
import ContactUs from "./components/ContactUs";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import RefundPolicy from "./components/RefundPolicy";
import Premium from "./components/Premium";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/auth" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<UserConnections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
              <Route path="/pages/contact-us" element={<ContactUs />} />
              <Route
                path="/pages/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/pages/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/pages/refund-policy" element={<RefundPolicy />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
