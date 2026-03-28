import { useNavigate } from 'react-router-dom'

const DEPT_COLORS = {
  'Computer Science': 'bg-blue-50 text-blue-700 border-blue-100',
  'Electrical Eng.':  'bg-yellow-50 text-yellow-700 border-yellow-100',
  'Mechanical Eng.':  'bg-orange-50 text-orange-700 border-orange-100',
  'Civil Eng.':       'bg-green-50 text-green-700 border-green-100',
}

export default function DashboardPage({ students }) {
  const navigate = useNavigate()

  const active   = students.filter(s => s.status === 'Active').length
  const inactive = students.filter(s => s.status === 'Inactive').length
  const avgGpa   = students.length
    ? (students.reduce((s, r) => s + r.gpa, 0) / students.length).toFixed(2)
    : '—'

  // Department breakdown
  const deptMap = {}
  students.forEach(s => {
    deptMap[s.department] = (deptMap[s.department] || 0) + 1
  })

  // Recent 5
  const recent = [...students].slice(-5).reverse()

  return (
    <div className="w-full px-12 py-10 flex flex-col gap-8">

      {/* Header */}
      <div>
        <p className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-1">Overview</p>
        <h1 className="text-2xl font-semibold text-stone-900">Dashboard</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: students.length, sub: 'All enrolled' },
          { label: 'Active',         value: active,          sub: 'Currently enrolled' },
          { label: 'Inactive',       value: inactive,        sub: 'Paused / left' },
          { label: 'Avg. GPA',       value: avgGpa,          sub: 'Across all students' },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-stone-100 rounded-2xl px-6 py-5 flex flex-col gap-1">
            <p className="text-xs text-stone-400 uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-semibold text-stone-900">{stat.value}</p>
            <p className="text-xs text-stone-400">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 items-start" style={{ gridTemplateColumns: '1fr 1fr' }}>

        {/* Department breakdown */}
        <div className="bg-white border border-stone-100 rounded-2xl p-6 flex flex-col gap-5">
          <h2 className="text-sm font-semibold text-stone-900">By Department</h2>
          <div className="flex flex-col gap-3">
            {Object.entries(deptMap).map(([dept, count]) => {
              const pct = Math.round((count / students.length) * 100)
              const colorClass = DEPT_COLORS[dept] || 'bg-stone-50 text-stone-600 border-stone-100'
              return (
                <div key={dept} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${colorClass}`}>{dept}</span>
                    <span className="text-stone-500 font-mono text-xs">{count} · {pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full">
                    <div className="h-1.5 bg-stone-700 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recently added */}
        <div className="bg-white border border-stone-100 rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-stone-900">Recently Added</h2>
            <button onClick={() => navigate('/students')} className="text-xs text-stone-400 hover:text-stone-700 transition-colors">View all →</button>
          </div>
          <div className="flex flex-col gap-3">
            {recent.map(s => (
              <div
                key={s.id}
                onClick={() => navigate(`/students/${s.id}`)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                  {s.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors truncate">{s.name}</p>
                  <p className="text-xs text-stone-400">{s.department}</p>
                </div>
                <span className="text-xs font-mono text-stone-400">{s.rollNo}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick actions */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/add')}
          className="px-6 py-3 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors"
        >
          + Add New Student
        </button>
        <button
          onClick={() => navigate('/profiles')}
          className="px-6 py-3 border border-stone-200 text-stone-600 rounded-xl text-sm font-medium hover:bg-stone-100 transition-colors"
        >
          View Profile Cards
        </button>
      </div>

    </div>
  )
}
