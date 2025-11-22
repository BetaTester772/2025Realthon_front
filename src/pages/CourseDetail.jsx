import { useState } from "react";
import Taskcard from "../components/Taskcard";

export default function CourseDetail() {
  const [grade, setGrade] = useState("A");
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
        현대암호기초, 선택과 집중 리포트
      </h2>
      <h2>히스토그램 자리</h2>
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
