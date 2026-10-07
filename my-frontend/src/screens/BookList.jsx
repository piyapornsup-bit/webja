import { useState, useEffect } from "react";
import { getAllBooks } from "../api/bookApi";   // TODO 4
import "./BookList.css";

export default function BookList() {
  const [books, setBooks] = useState([]);          // TODO 5
  const [isLoading, setIsLoading] = useState(true); // TODO 6

  // TODO 7
  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    setIsLoading(true);              // TODO 8
    const data = await getAllBooks(); // TODO 9
    setBooks(data);                  // TODO 10
    setIsLoading(false);             // TODO 11
  }

  if (isLoading) return <p className="loadingText">กำลังโหลดข้อมูล...</p>;

  return (
    <div className="bookContainer">
      <h2>รายการหนังสือในห้องสมุด</h2>

      <table className="bookTable">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>ชื่อหนังสือ</th>
            <th>ผู้แต่ง</th>
            <th>หมวดหมู่</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO 12 */}
          {books.map((book, index) => (
            <tr key={book.book_id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.available === 1 ? "ว่าง" : "ถูกยืมแล้ว"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}