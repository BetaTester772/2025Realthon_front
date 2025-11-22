import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Taskcard from "../components/Taskcard";
import Histogram from "../components/histogram";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setcourse] = useState(null);
  const [grade, setGrade] = useState("A");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://134.185.97.247:8000/courses");
        const json = await res.json();

        const found = json.find((c) => String(c.id) === String(courseId));

        setcourse(found);
      } catch (err) {
        console.error("fetch error:", err);
      }
    };

    fetchData();
  }, [courseId]);

  return (
    <div className="page">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <h4 style={{ marginRight: "8px", alignContent: "center" }}>
          목표 등급
        </h4>
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            outline: "none",
          }}
        >
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C+">C+</option>
        </select>
      </div>
      <h2 style={{ margin: "24px 0 12px 0" }}>
        {course
          ? `${course.name}, 선택과 집중 리포트`
          : "강의 정보를 불러오는 중..."}
      </h2>
      <Histogram />
      <div
        style={{
          backgroundColor: "#FAFAFC",
          border: "1px solid #F4F4F6",
          color: "#000000",
          padding: "16px",
          display: "flex",
          borderRadius: "16px",
          width: "90%",
          margin: "12px 0px",
        }}
      >
        예시 텍스트 입니다
      </div>
      <h2 style={{ margin: "24px 0 12px 0" }}>예정된 과제 • 시험</h2>
      <Taskcard title="과제2: 미국헌법수정" type="과제" rate="3.5" />
      <Taskcard title="중간고사" type="시험" rate="5.0" />
      <h2 style={{ margin: "24px 0 12px 0" }}>지나간 과제 • 시험</h2>
      <Taskcard title="과제1: 레포트 작성" type="과제" rate="3.5" />
      <Taskcard title="중간고사" type="시험" rate="5.0" />
    </div>
  );
}
