import { useEffect, useState } from "react";

export default function Histogram({ courseId }) {
  const [histData, setHistData] = useState(null);
  const [myCumulativeScore, setMyCumulativeScore] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchHistogram = async () => {
      try {
        const res = await fetch(
          `https://realthon.betatester772.dev/courses/${courseId}/cumulative-histogram`,
          {
            method: "GET",
          }
        );

        const json = await res.json();

        // cumulative_histogram 객체를 배열로 변환
        const hist = json.cumulative_histogram;

        const arr = Object.entries(hist).map(([range, value]) => ({
          range,
          value,
        }));

        setHistData(arr);

        // 유저의 누적 점수 정보 저장
        setMyCumulativeScore(json.my_cumulative_score);
      } catch (err) {
        console.error("fetch error:", err);
      }
    };

    fetchHistogram();
  }, [courseId]);

  if (!histData) {
    return <div>히스토그램 데이터를 불러오는 중...</div>;
  }

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
      {histData.map((b, i) => {
        // my_cumulative_score가 속한 구간인지 확인
        let isMyScoreRange = false;
        if (myCumulativeScore !== null) {
          const [min, max] = b.range.split("-").map(Number);
          isMyScoreRange = myCumulativeScore >= min && myCumulativeScore < max;
        }

        return (
          <div key={i} style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                backgroundColor: isMyScoreRange ? "#FF8C00" : "#007aff",
                width: "30px",
                height: `${b.value * 4}px`,
              }}
              title={b.range}
            />
            <h4 style={{ color: isMyScoreRange ? "#FF8C00" : "#d9d9d9" }}>
              {b.range}
            </h4>
          </div>
        );
      })}
    </div>
  );
}
