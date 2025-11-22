import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Taskcard from "../components/Taskcard";

export default function TaskDetail() {
  const { itemId } = useParams();
  const [item, setitem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://realthon.betatester772.dev/evaluation-items"
        );
        const json = await res.json();

        const found = json.find((c) => String(c.id) === String(itemId));

        setitem(found);
      } catch (err) {
        console.error("fetch error:", err);
      }
    };

    fetchData();
  }, [itemId]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="page">
      <Taskcard
        item={item}
        type={item.name.includes("과제") ? "과제" : "시험"}
        rate={`나의 점수: ${item.my_score}`}
      />
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
    </div>
  );
}
