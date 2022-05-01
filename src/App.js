import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostCreate from "./pages/post/PostCreate";
import PostEdit from "./pages/post/PostEdit";
import PostView from "./pages/post/PostView";
import PostDelete from "./pages/post/PostDelete";
import CommentCreate from "./pages/comment/CommentCreate";
import CommentEdit from "./pages/comment/CommentEdit";
import CommentDelete from "./pages/comment/CommentDelete";
import CommentView from "./pages/comment/CommentView";
import UserProfile from "./pages/user/UserProfile";
import UserEdit from "./pages/user/UserEdit";
import UserDelete from "./pages/user/UserDelete";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="post/create" element={<PostCreate />} />
        <Route path="post/edit" element={<PostEdit />} />
        <Route path="post/view" element={<PostView />} />
        <Route path="post/delete" element={<PostDelete />} />
        <Route path="comment/create" element={<CommentCreate />} />
        <Route path="comment/edit" element={<CommentEdit />} />
        <Route path="comment/delete" element={<CommentDelete />} />
        <Route path="comment/view" element={<CommentView />} />
        <Route path="user/profile" element={<UserProfile />} />
        <Route path="user/edit" element={<UserEdit />} />
        <Route path="user/delete" element={<UserDelete />} />
      </Routes>
    </div>
  );
}

export default App;
