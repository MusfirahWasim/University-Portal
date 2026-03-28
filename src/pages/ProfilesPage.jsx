import { useNavigate } from 'react-router-dom'

const DEPT_GRADIENTS = {
  'Computer Science': { from: '#1e293b', to: '#334155' },
  'Electrical Eng.':  { from: '#78350f', to: '#92400e' },
  'Mechanical Eng.':  { from: '#7c3aed', to: '#6d28d9' },
  'Civil Eng.':       { from: '#065f46', to: '#047857' },
}

export default function ProfilesPage({ students }) {
  const navigate = useNavigate()

  return (
    <div className="w-full px-12 py-10 flex flex-col gap-6">
      <div>
        <p className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-1">Cards</p>
        <h1 className="text-2xl font-semibold text-stone-900">Student Profiles</h1>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {students.map(student => {
          const grad    = DEPT_GRADIENTS[student.department] || { from: '#1c1917', to: '#292524' }
          const initials = student.name.split(' ').map(n => n[0]).join('')
          return (
            <div
              key={student.id}
              onClick={() => navigate(`/students/${student.id}`)}
              className="bg-white rounded-2xl border border-stone-100 overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Header band */}
              <div
                className="w-full h-20 flex items-end px-6 pb-0 relative"
                style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
              >
                {/* Avatar overlaps band */}
                <div className="absolute -bottom-5 left-6 w-12 h-12 rounded-full border-2 border-white bg-white flex items-center justify-center">
                  <span
                    className="text-sm font-bold"
                    style={{ color: grad.from }}
                  >{initials}</span>
                </div>
              </div>

              {/* Body */}
              <div className="pt-8 px-6 pb-6 flex flex-col gap-3">
                <div>
                  <h3 className="text-base font-semibold text-stone-900">{student.name}</h3>
                  <p className="text-xs text-stone-400 font-mono">{student.rollNo}</p>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-stone-500">
                  <div className="flex justify-between">
                    <span>Department</span>
                    <span className="font-medium text-stone-700">{student.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Year</span>
                    <span className="font-medium text-stone-700">{student.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GPA</span>
                    <span className="font-semibold text-stone-900">{student.gpa}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-50">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${student.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-500'}`}>
                    {student.status}
                  </span>
                  <span className="text-xs text-stone-400 truncate ml-2">{student.email}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
