import { useState } from "react";
import Time from "../assets/time.png";
export default function Coursecard({ course }) {
  //const [coursename, setcoursename] = useState("현대암호기초");
  //const [prof, setprof] = useState("김종길");
  //const [coursetime, setcoursetime] = useState("화4 목3");
  return (
    <div
      style={{
        backgroundColor: "#2E6FF3",
        color: "#ffffff",
        padding: "16px",
        display: "flex",
        borderRadius: "16px",
        width: "90%",
        margin: "12px 0px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h4>{course.name}</h4>
        <h4 style={{ color: "#C0D4FB" }}>{course.division}</h4>

        <h4 style={{ marginTop: "16px" }}>평가 방식 : {course.grading_type}</h4>
      </div>
    </div>
  );
}
