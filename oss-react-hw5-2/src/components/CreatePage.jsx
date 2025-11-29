import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, emptyForm } from "../api";

function CreatePage() {
  const navigate = useNavigate();

  // useState로 input 값 관리
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  // useRef로 DOM 접근 (유효성 체크)
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 간단한 유효성 검사 + useRef로 포커스
    if (!form.name.trim()) {
      alert("Name 은 필수입니다.");
      nameRef.current && nameRef.current.focus();
      return;
    }
    if (!form.email.trim()) {
      alert("Email 은 필수입니다.");
      emailRef.current && emailRef.current.focus();
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(`저장 실패: ${res.status}`);
      }

      alert("생성이 완료되었습니다.");
      navigate("/list");
    } catch (err) {
      console.error(err);
      alert(err.message || "저장 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h4 className="mb-3">Create</h4>

      <form onSubmit={handleSubmit}>
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

        <div className="mt-3 d-flex gap-2">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate("/list")}
          >
            취소
          </button>
          <button
            disabled={submitting}
            type="submit"
            className="btn btn-primary btn-sm"
          >
            {submitting ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePage;
