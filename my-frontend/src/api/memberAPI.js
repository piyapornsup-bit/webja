const BASE_URL = "http://localhost:3000/api/members";

// Initial mock data as fallback if backend server is not running
const INITIAL_MOCK_MEMBERS = [
  { nisit_id: "1", name: "วันชัย ชิดชอบ", username: "u101", phone: "0123456789", status: "active" },
  { nisit_id: "2", name: "สมชาย สายลม", username: "u102", phone: "0812345678", status: "active" },
  { nisit_id: "3", name: "วิภาวรรณ สุขใจ", username: "u103", phone: "0898765432", status: "inactive" },
];

function getLocalMembers() {
  const data = localStorage.getItem("members_mock_db");
  if (!data) {
    localStorage.setItem("members_mock_db", JSON.stringify(INITIAL_MOCK_MEMBERS));
    return INITIAL_MOCK_MEMBERS;
  }
  return JSON.parse(data);
}

function setLocalMembers(members) {
  localStorage.setItem("members_mock_db", JSON.stringify(members));
}

export async function getAllMembers() {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("API response error");
    return await res.json();
  } catch (err) {
    console.warn("Backend API unavailable, using local store fallback:", err.message);
    return getLocalMembers();
  }
}

export async function getMemberById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("API response error");
    return await res.json();
  } catch (err) {
    console.warn("Backend API unavailable, using local store fallback:", err.message);
    const members = getLocalMembers();
    return members.find((m) => String(m.nisit_id) === String(id) || String(m.id) === String(id)) || null;
  }
}

export async function createMember(memberData) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memberData),
    });
    if (!res.ok) throw new Error("API response error");
    return await res.json();
  } catch (err) {
    console.warn("Backend API unavailable, using local store fallback:", err.message);
    const members = getLocalMembers();
    const newMember = {
      nisit_id: memberData.nisit_id || Date.now().toString(),
      ...memberData,
    };
    members.push(newMember);
    setLocalMembers(members);
    return newMember;
  }
}

export async function updateMember(id, memberData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memberData),
    });
    if (!res.ok) throw new Error("API response error");
    return await res.json();
  } catch (err) {
    console.warn("Backend API unavailable, using local store fallback:", err.message);
    let members = getLocalMembers();
    members = members.map((m) =>
      String(m.nisit_id) === String(id) || String(m.id) === String(id)
        ? { ...m, ...memberData }
        : m
    );
    setLocalMembers(members);
    return { id, ...memberData };
  }
}

export async function deleteMember(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("API response error");
    return await res.json();
  } catch (err) {
    console.warn("Backend API unavailable, using local store fallback:", err.message);
    let members = getLocalMembers();
    members = members.filter(
      (m) => String(m.nisit_id) !== String(id) && String(m.id) !== String(id)
    );
    setLocalMembers(members);
    return { success: true, id };
  }
}