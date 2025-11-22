import "../style.css";
import { useState } from "react";
import Search from "../assets/Search.png";
import Coursecard from "../components/Coursecard";

export default function Home() {
  const [user, setuser] = useState("김리얼");

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
        <button>
          <img src={Search} alt="검색" />
        </button>
      </div>
      <h2 style={{ margin: "24px 0 12px 0" }}>수강 관리 중인 과목</h2>
      <Coursecard />
      <Coursecard />
      <Coursecard />
    </div>
  );
}
