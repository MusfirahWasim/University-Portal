import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DEPT_COLORS = {
  'Computer Science': 'bg-blue-50 text-blue-700',
  'Electrical Eng.':  'bg-yellow-50 text-yellow-700',
  'Mechanical Eng.':  'bg-orange-50 text-orange-700',
  'Civil Eng.':       'bg-green-50 text-green-700',
}

export default function StudentsPage({ students, onDelete }) {
  const navigate = useNavigate()
  const [search,  setSearch]  = useState('')
  const [dept,    setDept]    = useState('All')
  const [sortField, setSort]  = useState('name')
  const [sortDir,   setDir]   = useState('asc')

  const departments = ['All', ...new Set(students.map(s => s.department))]

  const handleSort = (field) => {
    if (sortField === field) setDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSort(field); setDir('asc') }
  }

  const filtered = students
    .filter(s => dept === 'All' || s.department === dept)
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) ||
                 s.rollNo.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let v = 0
      if (sortField === 'name')  v = a.name.localeCompare(b.name)
      if (sortField === 'gpa')   v = a.gpa - b.gpa
      if (sortField === 'year')  v = a.year.localeCompare(b.year)
      return sortDir === 'asc' ? v : -v
    })

  const SortBtn = ({ field, label }) => (
    <button onClick={() => handleSort(field)} className="flex items-center gap-1 hover:text-stone-900 transition-colors select-none">
      {label}
      <span className="flex flex-col leading-none text-[9px]">
        <span className={sortField === field && sortDir === 'asc'  ? 'text-stone-900' : 'text-stone-300'}>▲</span>
        <span className={sortField === field && sortDir === 'desc' ? 'text-stone-900' : 'text-stone-300'}>▼</span>
      </span>
    </button>
  )

  return (
    <div className="w-full px-12 py-10 flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-1">Directory</p>
          <h1 className="text-2xl font-semibold text-stone-900">Student List</h1>
        </div>
        <button
          onClick={() => navigate('/add')}
          className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors"
        >
          + Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search name or roll no…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-stone-700 transition-colors w-64"
        />
        <div className="flex items-center gap-2">
          {departments.map(d => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors
                ${dept === d ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'}`}
            >
              {d}
            </button>
          ))}
        </div>
        <span className="ml-auto text-sm text-stone-400 font-mono">{filtered.length} results</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3 text-center">
            <span className="text-3xl">🔍</span>
            <p className="text-sm text-stone-500">No students match your filters.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  <SortBtn field="name" label="Student" />
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Roll No.</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  <SortBtn field="year" label="Year" />
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  <SortBtn field="gpa" label="GPA" />
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, i) => {
                const deptColor = DEPT_COLORS[student.department] || 'bg-stone-100 text-stone-500'
                return (
                  <tr
                    key={student.id}
                    className={`border-b border-stone-50 hover:bg-stone-50 transition-colors ${i % 2 === 0 ? '' : 'bg-stone-50/30'}`}
                  >
                    <td className="px-6 py-4 text-xs text-stone-400 font-mono">{i + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-stone-900">{student.name}</p>
                          <p className="text-xs text-stone-400">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-stone-500">{student.rollNo}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${deptColor}`}>
                        {student.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">{student.year}</td>
                    <td className="px-6 py-4 text-sm font-semibold font-mono text-stone-900">{student.gpa}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${student.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-500'}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => navigate(`/students/${student.id}`)}
                          className="text-xs text-stone-400 hover:text-stone-900 transition-colors font-medium"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onDelete(student.id)}
                          className="text-xs text-stone-300 hover:text-red-400 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
