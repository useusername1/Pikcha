import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import OAuth from "./routes/OAuthRoute";
import ScrollToTop from "./components/ScrollToTop";
import useSetupAxiosInterceptor from "./hooks/useSetupAxiosInterceptor";
import ProtectedRoute from "./routes/ProtectedRoute";
import useSetupAuthBroadcastChannel from "./hooks/useSetupAuthBroadcastChannel";
import Loading from "./pages/Loading";

const Main = lazy(() => import("./pages/Main"));
const Place = lazy(() => import("./pages/Place/Place"));
const Post = lazy(() => import("./pages/Post/Post"));
const MyPage = lazy(() => import("./pages/MyPage/MyPage"));
const WritePost = lazy(() => import("./pages/Write_EditPost/WritePost"));
const PlaceDetail = lazy(() => import("./pages/PlaceDetail"));
const DetailPost = lazy(() => import("./pages/DetailPost/DetailPost"));
const Map = lazy(() => import("./pages/Map"));
const LoginSign = lazy(() => import("./pages/LoginSign"));
const EditPost = lazy(() => import("./pages/Write_EditPost/EditPost "));
const NoAddress = lazy(() => import("./pages/NoAddress"));

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
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<LoginSign />}></Route>
            <Route path="/" element={<Main />} />
            <Route path="/attractions" element={<Place />}>
              <Route path="search" element={<Place />} />
            </Route>
            <Route path="/posts" element={<Post />} />
            <Route path="/write/:postId" element={<WritePost />} />
            <Route path="/map" element={<Map />} />
            <Route path="/attractions/detail/:id" element={<PlaceDetail />} />
            <Route path="/posts/detail/:postId" element={<DetailPost />} />
            <Route path="/oauth" element={<OAuth />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/edit/:postId" element={<EditPost />} />
            </Route>
            <Route path="*" element={<NoAddress />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
