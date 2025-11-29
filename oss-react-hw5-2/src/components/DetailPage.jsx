import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, emptyForm } from "../api";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItem = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
      }
      const data = await res.json();
      setItem(data);
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

  if (loading) return <p>불러오는 중...</p>;
  if (error)
    return <div className="alert alert-danger py-2">{error}</div>;

  return (
    <div>
      <h4 className="mb-3">Detail (ID: {id})</h4>
      <div className="card">
        <div className="card-body">
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Username:</strong> {item.username}</p>
          <p><strong>Email:</strong> {item.email}</p>
          <p><strong>Phone:</strong> {item.phone}</p>
          <p><strong>City:</strong> {item.city}</p>
          <p><strong>District:</strong> {item.district}</p>
        </div>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => navigate("/list")}
        >
          목록으로
        </button>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => navigate(`/update/${id}`)}
        >
          수정하러 가기
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
