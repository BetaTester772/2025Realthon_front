import "../style.css";
import { useState, useEffect } from "react";
import Search from "../assets/Search.png";
import Coursecard from "../components/Coursecard";
import Profile from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
//import { courses } from "../data/courses";

export default function Home() {
  const [user, setuser] = useState("김리얼");
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://realthon.betatester772.dev/courses");
        const json = await res.json();
        setCourses(json);
      } catch (err) {
        console.error("fetch error:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://realthon.betatester772.dev/semester-advice?course_ids=1&course_ids=2&course_ids=3&target_grades=A%2B&target_grades=A&target_grades=B%2B"
        );
        const json = await res.json();
        setAdvice(json.overall_advice);
      } catch (err) {
        console.error("fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const handleClickCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <h4 style={{ color: "#7D8A95" }}>환영합니다!</h4>
          <h3>{user} 님</h3>
        </div>
        <div>
          <button style={{ marginRight: "16px" }}>
            <img src={Search} alt="검색" />
          </button>
          <button onClick={() => navigate("/profile")}>
            <img
              src={Profile}
              alt="프로필 수정"
              style={{ width: "28px", height: "28px" }}
            />
          </button>
        </div>
      </div>
      <h2 style={{ margin: "24px 0 12px 0" }}>이번 학기, 선택과 집중 리포트</h2>
      <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
        {advice}
      </div>
      <h2 style={{ margin: "24px 0 12px 0" }}>수강 관리 중인 과목</h2>
      {courses.map((course) => (
        <button
          key={course.id}
          onClick={() => handleClickCourse(course.id)}
          style={{ width: "100%", textAlign: "left" }}
        >
          <Coursecard course={course} />
        </button>
      ))}
    </div>
  );
}
