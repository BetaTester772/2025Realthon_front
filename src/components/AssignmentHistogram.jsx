import { useEffect, useState } from "react";

export default function AssignmentHistogram({ evaluationItemId }) {
  const [histData, setHistData] = useState(null);

  useEffect(() => {
    if (!evaluationItemId) return;

    const fetchHistogram = async () => {
      try {
        const res = await fetch(
          `https://realthon.betatester772.dev/predict-histogram?evaluation_item_id=${evaluationItemId}`
        );
        const json = await res.json();

        const hist = json.histogram;
        const arr = Object.entries(hist).map(([range, value]) => ({
          range,
          value,
        }));

        setHistData(arr);
      } catch (err) {
        console.error("fetch error:", err);
      }
    };

    fetchHistogram();
  }, [evaluationItemId]);

  if (!histData) {
    return <div>히스토그램 데이터를 불러오는 중...</div>;
  }

  const maxValue = Math.max(...histData.map((b) => b.value));

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "flex-end",
        margin: "30px",
      }}
    >
      {histData.map((b, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#007aff",
              width: "30px",
              height: `${(b.value / maxValue) * 200}px`,
              transition: "height 0.3s",
            }}
            title={`범위: ${b.range}, 값: ${b.value}`}
          />
          <h4 style={{ color: "#ddd", marginTop: "6px" }}>{b.range}</h4>
        </div>
      ))}
    </div>
  );
}
