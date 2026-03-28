import { useParams, useNavigate } from 'react-router-dom'

const DEPT_COLORS = {
  'Computer Science': 'bg-blue-50 text-blue-700',
  'Electrical Eng.':  'bg-yellow-50 text-yellow-700',
  'Mechanical Eng.':  'bg-orange-50 text-orange-700',
  'Civil Eng.':       'bg-green-50 text-green-700',
}

export default function StudentDetailPage({ students }) {
  const { id }   = useParams()
  const navigate = useNavigate()
  const student  = students.find(s => s.id === parseInt(id))

  if (!student) return (
    <div className="w-full px-12 py-24 flex flex-col items-center gap-4 text-center">
      <p className="text-stone-400">Student not found.</p>
      <button onClick={() => navigate('/students')} className="text-sm underline text-stone-600">← Back to Students</button>
    </div>
  )

  const deptColor = DEPT_COLORS[student.department] || 'bg-stone-100 text-stone-600'

  return (
    <div className="w-full px-12 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-400 mb-8">
        <button onClick={() => navigate('/')} className="hover:text-stone-700 transition-colors">Dashboard</button>
        <span>/</span>
        <button onClick={() => navigate('/students')} className="hover:text-stone-700 transition-colors">Students</button>
        <span>/</span>
        <span className="text-stone-700 font-medium">{student.name}</span>
      </nav>

      <div className="grid gap-6 items-start" style={{ gridTemplateColumns: '1fr 300px' }}>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
          {/* Top band */}
          <div className="w-full h-24 bg-stone-900" />
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="-mt-8 mb-5 flex items-end justify-between">
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-stone-100 flex items-center justify-center text-xl font-bold text-stone-900 shadow-sm">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full mt-10 ${student.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-500'}`}>
                {student.status}
              </span>
            </div>

            <h1 className="text-2xl font-semibold text-stone-900">{student.name}</h1>
            <p className="text-sm text-stone-400 font-mono mt-0.5">{student.rollNo}</p>

            <div className="mt-6 grid grid-cols-2 gap-6">
              {[
                { label: 'Email',      value: student.email      },
                { label: 'Phone',      value: student.phone      },
                { label: 'Department', value: student.department },
                { label: 'Year',       value: student.year       },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-stone-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* GPA card */}
          <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-3">
            <p className="text-xs text-stone-400 uppercase tracking-wider">GPA</p>
            <p className="text-5xl font-bold text-stone-900">{student.gpa}</p>
            <div className="w-full bg-stone-100 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-stone-800 transition-all"
                style={{ width: `${(student.gpa / 4) * 100}%` }}
              />
            </div>
            <p className="text-xs text-stone-400">out of 4.0</p>
          </div>

          {/* Department */}
          <div className="bg-white rounded-2xl border border-stone-100 p-6">
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-3">Department</p>
            <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${deptColor}`}>
              {student.department}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate('/students')}
              className="w-full py-3 border border-stone-200 text-stone-600 rounded-xl text-sm font-medium hover:bg-stone-100 transition-colors"
            >
              ← Back to Students
            </button>
            <button
              onClick={() => navigate('/profiles')}
              className="w-full py-3 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors"
            >
              View All Profiles
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
