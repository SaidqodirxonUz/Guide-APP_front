import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./pages/login/login";
import Main from "./pages/main/main";
import UsersPage from "./pages/users/Users";
import UsersInfo from "./pages/userInfo/userInfo";
import EditUser from "./pages/editUser/editUser";
import Guide from "./pages/guides/Guide";
import EditGuide from "./pages/editGuide/editGuide";
import GuideInfo from "./pages/guideInfo/guideInfo";
import CreateGuide from "./pages/createGuide/createGuide";
import CreateUser from "./pages/createUser/createUser";
import Notification from "./pages/Notification/notification";
import EditMe from "./pages/editMe/editMe";
import NotFound from "./pages/notFound/notFound";
import Redirect from "./components/redirect";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UsersInfo />} />
        <Route path="/users/me" element={<EditMe />} />
        <Route path="/users/add" element={<CreateUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />

        <Route path="/guide" element={<Guide />} />
        <Route path="/guide/edit/:id" element={<EditGuide />} />
        <Route path="/guide/:id" element={<GuideInfo />} />
        <Route path="/guide/add" element={<CreateGuide />} />

        <Route path="/notification" element={<Notification />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="*" element={<Redirect />} />
      </Routes>
    </>
  );
}

export default App;
