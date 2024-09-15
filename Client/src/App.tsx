import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loading from "./pages/Loading";
import Modal from "./components/@common/LoginModal";
import ScrollToTop from "./components/@common/ScrollToTop";
import OAuth from "./routes/OAuthRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import useSetupAxiosInterceptor from "./hooks/useSetupAxiosInterceptor";
import useSetupAuthBroadcastChannel from "./hooks/useSetupAuthBroadcastChannel";
import Chat from "./components/Chat";

const Main = lazy(() => import("./pages/Main"));
const Place = lazy(() => import("./pages/Place"));
const Post = lazy(() => import("./pages/Post"));
const MyPage = lazy(() => import("./pages/MyPage"));
const PostEditor = lazy(() => import("./pages/PostEditor"));
const PlaceDetail = lazy(() => import("./pages/DetailPlace"));
const DetailPost = lazy(() => import("./pages/DetailPost"));
const Map = lazy(() => import("./pages/Map"));
const LoginSignUp = lazy(() => import("./pages/LoginSignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  useSetupAxiosInterceptor();
  useSetupAuthBroadcastChannel();
  useEffect(() => {
    sessionStorage.setItem("pageData", "{}");
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Modal />
        <Chat key={"chatbox"} />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<LoginSignUp />}></Route>
            <Route path="/" element={<Main />} />
            <Route path="/attractions" element={<Place />}>
              <Route path="search" element={<Place />} />
            </Route>
            <Route path="/posts" element={<Post />} />
            <Route path="/map" element={<Map />} />
            <Route
              path="/attractions/detail/:attractionId"
              element={<PlaceDetail />}
            />
            <Route path="/posts/detail/:postId" element={<DetailPost />} />
            <Route path="/oauth" element={<OAuth />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/mypage" element={<MyPage />} />
              <Route
                path="/write/:targetId"
                element={<PostEditor mode="new" />}
              />
              <Route
                path="/edit/:targetId"
                element={<PostEditor mode="edit" />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
