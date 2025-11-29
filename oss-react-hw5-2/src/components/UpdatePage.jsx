import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, emptyForm } from "../api";

function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCount, setEditCount] = useState(0); // 총 수정 횟수

  // useRef 로 유효성 체크용
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  // 기존 데이터 불러오기
  const fetchItem = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
      }
      const data = await res.json();
      setForm({
        name: data.name || "",
        username: data.username || "",
        email: data.email || "",
        phone: data.phone || "",
        city: data.city || "",
        district: data.district || "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  // 서버에 PUT으로 저장하는 함수
  const saveToServer = async (updatedForm) => {
    // 간단 유효성 검사 (비어 있으면 ref로 포커스)
    if (!updatedForm.name.trim()) {
      nameRef.current && nameRef.current.focus();
      return;
    }
    if (!updatedForm.email.trim()) {
      emailRef.current && emailRef.current.focus();
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(updatedForm),
      });

      if (!res.ok) {
        throw new Error(`저장 실패: ${res.status}`);
      }
      // 별도 alert은 안 띄움 (실시간 저장 느낌)
      console.log("자동 저장 완료");
    } catch (err) {
      console.error(err);
      // 에러는 콘솔/alert 중 하나만 간단하게
      alert(err.message || "저장 중 오류가 발생했습니다.");
    }
  };

  // input 값이 변경될 때마다
  // 1) useState로 값 업데이트
  // 2) 수정 횟수 증가
  // 3) 즉시 PUT 요청
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };

    setForm(updated);
    setEditCount((prev) => prev + 1); // 수정 횟수 +1
    saveToServer(updated); // 서버에 바로 저장
  };

  if (loading) return <p>불러오는 중...</p>;
  if (error)
    return <div className="alert alert-danger py-2">{error}</div>;

  return (
    <div>
      <h4 className="mb-1">Update (ID: {id})</h4>
      <p className="text-muted mb-3">
        ⚙ 입력값이 변경될 때마다 자동으로 서버에 저장됩니다. (총 수정 횟수:{" "}
        <strong>{editCount}</strong> 회)
      </p>

      <form>
        <div className="mb-2">
          <label className="form-label mb-1">Name*</label>
          <input
            ref={nameRef}
            name="name"
            className="form-control form-control-sm"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="form-label mb-1">Username</label>
          <input
            name="username"
            className="form-control form-control-sm"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="form-label mb-1">Email*</label>
          <input
            ref={emailRef}
            name="email"
            className="form-control form-control-sm"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="form-label mb-1">Phone</label>
          <input
            name="phone"
            className="form-control form-control-sm"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="form-label mb-1">City</label>
          <input
            name="city"
            className="form-control form-control-sm"
            value={form.city}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="form-label mb-1">District</label>
          <input
            name="district"
            className="form-control form-control-sm"
            value={form.district}
            onChange={handleChange}
          />
        </div>
      </form>

      <div className="mt-3 d-flex gap-2">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => navigate("/list")}
        >
          목록으로
        </button>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => navigate(`/detail/${id}`)}
        >
          상세보기
        </button>
      </div>
    </div>
  );
}

export default UpdatePage;
