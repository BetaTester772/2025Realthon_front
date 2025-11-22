import {useState, useEffect} from "react";
// import {useNavigate} from "react-router-dom";
import "../style-hoseong.css";

export default function Profile() {
    // const navigate = useNavigate();
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
        <div className="container">
            {/* Header Section */}
            <header className="header">
                <h2>프로필 관리</h2>
                {/*<button className="btn btn-outline" onClick={() => navigate("/")}>*/}
                {/*    홈으로*/}
                {/*</button>*/}
            </header>

            {/* Error Message */}
            {error && <div className="error-box">{error}</div>}

            {/* Content Section */}
            {loading && !profile ? (<div className="loading-text">프로필을 불러오는 중...</div>) : profile ? (<>
                {/* Current Profile Card */}
                <div className="card">
                    <div>
                        <h4 className="label-text">현재 프로필 (ID: {profile.id})</h4>
                        <p className="content-text">{profile.preferences}</p>
                    </div>
                </div>

                {/* Edit Form Card */}
                <form onSubmit={handleUpdateProfile} className="card">
                    <h3>프로필 수정</h3>
                    <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
                <textarea
                    className="textarea-field"
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    placeholder="선호도를 자유롭게 입력하세요 (예: 수학 문제를 좋아함)"
                    disabled={loading}
                    rows={5}
                />
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary"
                            >
                                {loading ? "저장 중..." : "변경사항 저장"}
                            </button>
                        </div>
                    </div>
                </form>
            </>) : (<div className="empty-text">프로필을 불러올 수 없습니다.</div>)}
        </div>
    </div>);
}

