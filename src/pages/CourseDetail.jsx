import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Taskcard from "../components/Taskcard";
import Histogram from "../components/Histogram";

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setcourse] = useState(null);
  const [items, setitems] = useState([]);
  const [grade, setGrade] = useState("A");
  const [courseAdvice, setCourseAdvice] = useState(null);

  const handleChangeGrade = async (e) => {
    const newGrade = e.target.value;
    setGrade(newGrade);

    try {
      const params = new URLSearchParams();
      params.append("course_ids", courseId);
      params.append("target_grades", newGrade);

      await fetch(
        `https://realthon.betatester772.dev/semester-advice?${params.toString()}`,
        {
          method: "GET",
        }
      );

      console.log("목표 등급 저장 성공");
    } catch (err) {
      console.error("목표 등급 저장 실패:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://realthon.betatester772.dev/courses");
        const json = await res.json();

        const found = json.find((c) => String(c.id) === String(courseId));

        setcourse(found);
      } catch (err) {
        console.error("fetch error:", err);
      }
    };

    fetchData();
  }, [courseId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://realthon.betatester772.dev/evaluation-items"
        );
        const json = await res.json();
        setitems(json);
      } catch (err) {
        console.error("fetch error:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const params = new URLSearchParams();
        // objective_grade는 optional이지만 우리가 갖고 있으니 같이 보내기
        params.append("objective_grade", grade);

        const res = await fetch(
          `https://realthon.betatester772.dev/courses/${courseId}/advice?${params.toString()}`,
          {
            method: "GET",
          }
        );
        const json = await res.json();
        setCourseAdvice(json);
      } catch (err) {
        console.error("fetch advice error:", err);
      }
    };

    if (courseId) {
      fetchAdvice();
    }
  }, [courseId, grade]);

  const handleClickItem = (item) => {
    if (item.is_submitted) {
      // 완료된 태스크용 페이지
      navigate(`/courses/${courseId}/${item.id}/done`);
    } else {
      // 안 완료된 태스크용 페이지
      navigate(`/courses/${courseId}/${item.id}`);
    }
  };

  const upcomingItems = items
    .filter((item) => String(item.course_id) === String(courseId))
    .filter((item) => !item.is_submitted);

  const pastItems = items
    .filter((item) => String(item.course_id) === String(courseId))
    .filter((item) => item.is_submitted);

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
          onChange={(e) => {
            handleChangeGrade(e);
          }}
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
      <Histogram courseId={courseId} />
      <div
        style={{
          backgroundColor: "#FAFAFC",
          border: "1px solid #F4F4F6",
          color: "#000000",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          width: "90%",
          margin: "12px 0px",
          minHeight: "90px",
          maxHeight: "150px", // 너무 길면
          overflowY: "auto", // 스크롤 되도록
          gap: "8px",
        }}
      >
        {courseAdvice ? (
          <>
            <h4 style={{ margin: 0 }}>요약</h4>
            <p style={{ margin: 0 }}>{courseAdvice.summary}</p>

            <h4 style={{ margin: "8px 0 0 0" }}>세부 조언</h4>
            <p style={{ margin: 0 }}>{courseAdvice.advice}</p>

            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "12px",
                color: "#7D8A95",
              }}
            >
              과제 난이도: {courseAdvice.assignment_difficulty} • 시험 난이도:{" "}
              {courseAdvice.exam_difficulty}
            </p>
          </>
        ) : (
          <span>이 과목에 대한 조언을 불러오는 중...</span>
        )}
      </div>
      <h2 style={{ margin: "24px 0 12px 0" }}>예정된 과제 • 시험</h2>
      {upcomingItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClickItem(item.id)}
          style={{ width: "100%", textAlign: "left" }}
        >
          <Taskcard
            item={item}
            type={item.name.includes("과제") ? "과제" : "시험"}
            rate="중요도 ⭐ : 5.0"
          />
        </button>
      ))}
      <button style={{ width: "100%" }}>
        <div
          style={{
            border: "1px solid #007aff",
            padding: "16px",
            display: "flex",
            borderRadius: "16px",
            color: "#007aff",
            width: "90%",
            margin: "12px 0px",
            justifyContent: "center",
          }}
        >
          <h4>예정된 과제 • 시험 추가하기</h4>
        </div>
      </button>
      <h2 style={{ margin: "24px 0 12px 0" }}>지나간 과제 • 시험</h2>
      {pastItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClickItem(item.id)}
          style={{ width: "100%", textAlign: "left" }}
        >
          <Taskcard
            item={item}
            type={item.name.includes("과제") ? "과제" : "시험"}
            rate={`나의 점수: ${item.my_score}`}
          />
        </button>
      ))}
      <button style={{ width: "100%" }}>
        <div
          style={{
            border: "1px solid #007aff",
            padding: "16px",
            display: "flex",
            borderRadius: "16px",
            color: "#007aff",
            width: "90%",
            margin: "12px 0px",
            justifyContent: "center",
          }}
        >
          <h4>지나간 과제 • 시험 추가하기</h4>
        </div>
      </button>
    </div>
  );
}
