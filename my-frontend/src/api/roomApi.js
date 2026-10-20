const BASE_URL = 'http://localhost:3000/api/rooms';

export const getRooms = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(`${BASE_URL}?${params}`);
    return await res.json();
};

export const getRoomById = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    return await res.json();
};

export const createRoom = async (data) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await res.json();
};

export const updateRoom = async (id, roomData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
    });
    return await response.json();
};

export const reserveRoom = async (id, bookingData) => {
    const response = await fetch(`${BASE_URL}/${id}/reserve`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'การจองห้องพักล้มเหลว');
    }
    return data;
};

export const deleteRoom = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    return await res.json();
};