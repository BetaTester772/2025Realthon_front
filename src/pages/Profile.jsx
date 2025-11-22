import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../style.css";

export default function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [preferences, setPreferences] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("https://realthon.betatester772.dev/student-profile");
            if (!res.ok) throw new Error("프로필을 불러오는데 실패했습니다.");
            const json = await res.json();
            setProfile(json);
            setPreferences(json.preferences || "");
        } catch (err) {
            console.error("fetch error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!preferences.trim()) {
            alert("선호도를 입력해주세요.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await fetch("https://realthon.betatester772.dev/student-profile", {
                method: "PUT", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({preferences: preferences.trim()}),
            });

            if (!res.ok) throw new Error("프로필 업데이트에 실패했습니다.");
            const updatedProfile = await res.json();
            setProfile(updatedProfile);
            alert("프로필이 업데이트되었습니다!");
        } catch (err) {
            console.error("update error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (<div className="page">
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "24px",
            }}
        >
            <h2>프로필 관리</h2>
            <button
                onClick={() => navigate("/")}
                style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "1px solid #007aff",
                    color: "#007aff",
                    backgroundColor: "white",
                }}
            >
                홈으로
            </button>
        </div>

        {error && (<div
            style={{
                backgroundColor: "#ffebee",
                color: "#c62828",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "16px",
            }}
        >
            {error}
        </div>)}

        {loading && !profile ? (
            <div style={{textAlign: "center", color: "#7D8A95", padding: "24px"}}>
                프로필을 불러오는 중...
            </div>
        ) : profile ? (
            <>
                <div
                    style={{
                        backgroundColor: "#FAFAFC",
                        border: "1px solid #F4F4F6",
                        padding: "16px",
                        borderRadius: "16px",
                        marginBottom: "24px",
                    }}
                >
                    <h4 style={{color: "#7D8A95", marginBottom: "8px"}}>
                        현재 프로필 (ID: {profile.id})
                    </h4>
                    <p style={{margin: 0, fontSize: "16px"}}>{profile.preferences}</p>
                </div>

                <form onSubmit={handleUpdateProfile}>
                    <h3 style={{marginBottom: "12px"}}>프로필 수정</h3>
                    <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                        <textarea
                            value={preferences}
                            onChange={(e) => setPreferences(e.target.value)}
                            placeholder="선호도를 입력하세요"
                            disabled={loading}
                            rows={4}
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #ddd",
                                outline: "none",
                                resize: "vertical",
                                fontFamily: "inherit",
                            }}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: "12px 24px",
                                borderRadius: "8px",
                                border: "none",
                                backgroundColor: loading ? "#ccc" : "#007aff",
                                color: "white",
                                cursor: loading ? "not-allowed" : "pointer",
                            }}
                        >
                            {loading ? "업데이트 중..." : "프로필 업데이트"}
                        </button>
                    </div>
                </form>
            </>
        ) : (
            <div
                style={{
                    textAlign: "center",
                    color: "#7D8A95",
                    padding: "24px",
                    backgroundColor: "#FAFAFC",
                    borderRadius: "16px",
                }}
            >
                프로필을 불러올 수 없습니다.
            </div>
        )}
    </div>);
}
