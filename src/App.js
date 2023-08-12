import Login from "./pages/login/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import RequireUser from "../src/components/RequireUser";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import UPdateProfile from "./components/updateProfile/UPdateProfile";
import LoadingBar from "react-top-loading-bar";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import OnlyIfNotLoggedIn from "./components/OnlyIfNotLoggedIn";
import toast, { Toaster } from "react-hot-toast";

export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";

function App() {
  const loadingRef = useRef(null);
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const toastData = useSelector((state) => state.appConfigReducer.toastData);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message);
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message);
        break;
    }
  }, [toastData]);

  return (
    <div className="App">
      <LoadingBar color="#000" ref={loadingRef} />
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/updateProfile" element={<UPdateProfile />} />
          </Route>
        </Route>
        <Route element={<OnlyIfNotLoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
