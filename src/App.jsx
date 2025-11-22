import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseDetail from "./pages/CourseDetail";
import TaskDetail from "./pages/TaskDetail";
import DoneTaskDetail from "./pages/DoneTaskDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/courses/:courseId/:itemId" element={<TaskDetail />} />
        <Route
          path="/courses/:courseId/:itemId/done"
          element={<DoneTaskDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
