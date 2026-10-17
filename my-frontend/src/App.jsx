import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import RoomListScreen from './screens/RoomListScreen';
import RoomDetailScreen from './screens/RoomDetailScreen';
import BookingScreen from './screens/BookingScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import AdminRoomListScreen from './screens/AdminRoomListScreen';
import AddRoomScreen from './screens/AddRoomScreen';
import UpdateRoomScreen from './screens/UpdateRoomScreen';
import FaqScreen from './screens/FaqScreen';

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/rooms" element={<RoomListScreen />} />
                <Route path="/rooms/:id" element={<RoomDetailScreen />} />
                <Route path="/booking/:id" element={<BookingScreen />} />
                <Route path="/calculator" element={<CalculatorScreen />} />
                <Route path="/admin" element={<AdminRoomListScreen />} />
                <Route path="/admin/add" element={<AddRoomScreen />} />
                <Route path="/admin/edit/:id" element={<UpdateRoomScreen />} />
                <Route path="/faq" element={<FaqScreen />} />
            </Routes>
        </BrowserRouter>
    );
}