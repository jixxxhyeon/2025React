import React, { useEffect, useState } from "react";

const API_URL = "https://69218735512fb4140be07ddc.mockapi.io/data";

const emptyForm = {
  name: "",
  username: "",
  email: "",
  phone: "",
  city: "",
  district: "",
};

function ShowList() {

    // 목록 데이터
    const [items, setItems] = useState([]);    
    // 로딩 상태  
    const [loading, setLoading] = useState(false); 
    // 에러 메시지
    const [error, setError] = useState(null);     
    // 폼 입력 값
    const [form, setForm] = useState(emptyForm);   
    // null이면 새로 추가, 값이 있으면 수정한다.
    const [editingId, setEditingId] = useState(null); 
    // 모달 열림 여부를 상태로 관리한다.
    const [showModal, setShowModal] = useState(false);

    // 1) 목록 불러오기
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

    // 2) 폼 입력 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // 3) 모달 생성 및 닫기(수정 및 생성)
    const openCreateModal = () => {
        setEditingId(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setEditingId(item.id);
        setForm({
        name: item.name || "",
        username: item.username || "",
        email: item.email || "",
        phone: item.phone || "",
        city: item.city || "",
        district: item.district || "",
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // 4) 저장(생성 및 수정)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim() || !form.email.trim()) {
        alert("이름과 이메일은 필수입니다.");
        return;
        }

        try {
        const method = editingId ? "PUT" : "POST";
        const url = editingId ? `${API_URL}/${editingId}` : API_URL;

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            throw new Error(`저장 실패: ${res.status}`);
        }

        closeModal();
        setForm(emptyForm);
        setEditingId(null);
        fetchList(); 
        } catch (err) {
        console.error(err);
        alert(err.message || "저장 중 오류가 발생했습니다.");
        }
    };

    // 5) 삭제 
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
        <div className="container py-4">
        <h1 className="mb-2">React CRUD Page (mockapi.io)</h1>
        <p className="text-muted mb-3">
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
            onClick={openCreateModal}
            >
            새 데이터 추가
            </button>
        </div>

        {loading && <p>불러오는 중...</p>}
        {error && (
            <div className="alert alert-danger py-2">
            {error}
            </div>
        )}

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
                    <th style={{ width: "140px" }}>Actions</th>
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
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => openEditModal(item)}
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

        {showModal && (
            <div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
            <div className="modal-dialog">
                <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="modal-header">
                    <h5 className="modal-title">
                        {editingId ? "데이터 수정" : "새 데이터 추가"}
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                    ></button>
                    </div>
                    <div className="modal-body">
                    <div className="mb-2">
                        <label className="form-label mb-1">Name</label>
                        <input
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
                        <label className="form-label mb-1">Email</label>
                        <input
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
                    </div>
                    <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={closeModal}
                    >
                        닫기
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary btn-sm"
                    >
                        저장
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}

export default ShowList;
