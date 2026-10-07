//import { Routes, Route } from "react-router-dom";
//import ListMember from "./screens/ListMember";
//import Register from "./screens/Register";
//import UpdateMember from "./screens/UpdateMember";

//export default function App() {
//  return (
//    <Routes>
//      <Route path="/" element={<ListMember />} />
//      <Route path="/register" element={<Register />} />
//      <Route path="/update/:id" element={<UpdateMember />} />
//    </Routes>
//  );
//}

import { Routes, Route } from "react-router-dom";
import BookList from "./screens/BookList";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BookList />} />
    </Routes>
  );
}