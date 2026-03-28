import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DEPARTMENTS = ['Computer Science', 'Electrical Eng.', 'Mechanical Eng.', 'Civil Eng.']
const YEARS       = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export default function AddStudentPage({ students, onAddStudent }) {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', phone: '', department: '', year: '', gpa: '', status: 'Active',
  })
  const [errors,  setErrors]  = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())       e.name       = 'Required'
    if (!form.email.trim())      e.email      = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.department)        e.department = 'Required'
    if (!form.year)              e.year       = 'Required'
    if (!form.gpa)               e.gpa        = 'Required'
    else if (form.gpa < 0 || form.gpa > 4) e.gpa = 'GPA must be 0–4'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    // Auto-generate roll number
    const deptCode = { 'Computer Science': 'CS', 'Electrical Eng.': 'EE', 'Mechanical Eng.': 'ME', 'Civil Eng.': 'CE' }
    const year = new Date().getFullYear()
    const seq  = String(students.length + 1).padStart(3, '0')
    const rollNo = `${deptCode[form.department]}-${year}-${seq}`

    onAddStudent({
      id:         Date.now(),
      name:       form.name,
      email:      form.email,
      phone:      form.phone || 'N/A',
      department: form.department,
      year:       form.year,
      gpa:        parseFloat(form.gpa),
      status:     form.status,
      rollNo,
    })

    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      navigate('/students')
    }, 1500)
  }

  const inputClass = (field) =>
    `w-full bg-stone-50 border ${errors[field] ? 'border-red-400' : 'border-stone-200'} rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-stone-700 transition-colors`

  const selectClass = (field) =>
    `w-full bg-stone-50 border ${errors[field] ? 'border-red-400' : 'border-stone-200'} rounded-xl px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-700 appearance-none cursor-pointer transition-colors`

  return (
    <div className="w-full px-12 py-10">
      <div className="mb-8">
        <p className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-1">Enrol</p>
        <h1 className="text-2xl font-semibold text-stone-900">Add New Student</h1>
      </div>

      <div className="grid gap-8 items-start" style={{ gridTemplateColumns: '1fr 300px' }}>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-stone-100 p-8 flex flex-col gap-6">

          {/* Personal info */}
          <div>
            <h2 className="text-sm font-semibold text-stone-900 pb-3 border-b border-stone-100 mb-5">Personal Information</h2>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">Full Name *</label>
                  <input type="text" placeholder="Jane Doe" value={form.name} onChange={handleChange('name')} className={inputClass('name')} />
                  {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">Phone</label>
                  <input type="text" placeholder="+1 555-0000" value={form.phone} onChange={handleChange('phone')} className={inputClass('phone')} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">Email Address *</label>
                <input type="email" placeholder="jane@uni.edu" value={form.email} onChange={handleChange('email')} className={inputClass('email')} />
                {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Academic info */}
          <div>
            <h2 className="text-sm font-semibold text-stone-900 pb-3 border-b border-stone-100 mb-5">Academic Information</h2>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">Department *</label>
                  <div className="relative">
                    <select value={form.department} onChange={handleChange('department')} className={selectClass('department')}>
                      <option value="">Select…</option>
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-xs">▾</span>
                  </div>
                  {errors.department && <p className="text-xs text-red-400">{errors.department}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">Year *</label>
                  <div className="relative">
                    <select value={form.year} onChange={handleChange('year')} className={selectClass('year')}>
                      <option value="">Select…</option>
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-xs">▾</span>
                  </div>
                  {errors.year && <p className="text-xs text-red-400">{errors.year}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">GPA (0.0 – 4.0) *</label>
                  <input type="number" step="0.1" min="0" max="4" placeholder="3.5" value={form.gpa} onChange={handleChange('gpa')} className={inputClass('gpa')} />
                  {errors.gpa && <p className="text-xs text-red-400">{errors.gpa}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">Status</label>
                  <div className="relative">
                    <select value={form.status} onChange={handleChange('status')} className={selectClass('status')}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-xs">▾</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              className={`flex-1 py-3.5 rounded-xl text-sm font-medium transition-all duration-200
                ${success ? 'bg-green-500 text-white' : 'bg-stone-900 text-white hover:bg-stone-700'}`}
            >
              {success ? '✓ Student Added!' : 'Add Student'}
            </button>
            <button
              onClick={() => navigate('/students')}
              className="px-6 py-3.5 rounded-xl text-sm font-medium border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Info sidebar */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-4 sticky top-24">
          <h3 className="text-sm font-semibold text-stone-900">Notes</h3>
          <div className="flex flex-col gap-3 text-xs text-stone-500 leading-relaxed">
            <p>• Roll number is auto-generated based on department and enrolment order.</p>
            <p>• Fields marked with * are required.</p>
            <p>• GPA should be between 0.0 and 4.0.</p>
            <p>• You can update student details later from the Students page.</p>
          </div>
          <div className="border-t border-stone-100 pt-4 text-xs text-stone-400">
            Currently enrolled: <span className="font-semibold text-stone-700">{students.length}</span> students
          </div>
        </div>

      </div>
    </div>
  )
}
