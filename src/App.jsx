import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import seedStudents    from './data/students'
import Navbar          from './components/Navbar'
import DashboardPage   from './pages/DashboardPage'
import StudentsPage    from './pages/StudentsPage'
import AddStudentPage  from './pages/AddStudentPage'
import ProfilesPage    from './pages/ProfilesPage'
import StudentDetailPage from './pages/StudentDetailPage'

export default function App() {
  // Lifted state — single source of truth for all students
  const [students, setStudents] = useState(seedStudents)

  const handleAddStudent = (newStudent) => {
    setStudents(prev => [...prev, newStudent])
  }

  const handleDeleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id))
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ backgroundColor: '#f0efed' }}>
        <Navbar studentCount={students.length} />

        <Routes>
          <Route path="/" element={
            <DashboardPage students={students} />
          } />
          <Route path="/students" element={
            <StudentsPage students={students} onDelete={handleDeleteStudent} />
          } />
          <Route path="/students/:id" element={
            <StudentDetailPage students={students} />
          } />
          <Route path="/add" element={
            <AddStudentPage students={students} onAddStudent={handleAddStudent} />
          } />
          <Route path="/profiles" element={
            <ProfilesPage students={students} />
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
