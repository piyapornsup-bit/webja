const BASE_URL = "http://localhost:3000/api/members";

export async function getAllMembers() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createMember(memberData) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(memberData),
  });
  return res.json();
}

export async function getMemberById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("ไม่พบสมาชิก");
  return res.json();
}

export async function updateMember(id, memberData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(memberData),
  });
  return res.json();
}

export async function deleteMember(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return res.json();
}