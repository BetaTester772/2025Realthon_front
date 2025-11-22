import { useEffect, useState } from "react";
export default function Histogram() {
  const [height, setheight] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://134.185.97.247:8000/dumy-histo");
        const json = await res.json();
        const arr = Object.entries(json).map(([range, value]) => ({
          range,
          value,
        }));

        setheight(arr);
      } catch (err) {
        console.error("fetch error:", err);
      }
    };

    fetchData();
  }, []);

  if (!height) {
    return <div>히스토그램 데이터를 불러오는 중...</div>;
  }

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
      {height.map((b, i) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            key={i}
            style={{
              backgroundColor: "#007aff",
              width: "30px",
              height: `${b.value * 5}px`,
            }}
            title={b.range}
          />
          <h4 style={{ color: "#d9d9d9" }}>{b.range}</h4>
        </div>
      ))}
    </div>
  );
}
