import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

function ListPage() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchList = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
      }
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제할까요?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`삭제 실패: ${res.status}`);
      }
      fetchList();
    } catch (err) {
      console.error(err);
      alert(err.message || "삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <p className="text-muted">
        API: <code>{API_URL}</code>
      </p>

      <div className="mb-3 d-flex gap-2">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={fetchList}
        >
          데이터 다시 불러오기
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate("/create")}
        >
          새 데이터 추가
        </button>
      </div>

      {loading && <p>불러오는 중...</p>}
      {error && <div className="alert alert-danger py-2">{error}</div>}

      {!loading && !error && items.length === 0 && (
        <p className="text-muted">데이터가 없습니다.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-sm align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>District</th>
                <th style={{ width: "180px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.city}</td>
                  <td>{item.district}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary me-1"
                      onClick={() => navigate(`/detail/${item.id}`)}
                    >
                      Detail
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => navigate(`/update/${item.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListPage;
