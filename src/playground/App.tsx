import React, { useState } from 'react'
import { InputField } from '@/components/InputField'
import { DataTable, Column } from '@/components/DataTable'

type Person = { id: number; name: string; email: string; age: number }

const initial: Person[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@calc.org', age: 36 },
  { id: 2, name: 'Grace Hopper', email: 'grace@navy.mil', age: 85 },
  { id: 3, name: 'Alan Turing', email: 'alan@bletchley.uk', age: 41 },
]

const columns: Column<Person>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
]

export const App: React.FC = () => {
  const [name, setName] = useState('')
  const [pwd, setPwd] = useState('')
  const [rows, setRows] = useState<Person[]>(initial)
  const [loading, setLoading] = useState(false)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">UI Components Demo</h1>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <InputField
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            helperText="This is a helper text"
            clearable
            variant="outlined"
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            helperText="8+ chars"
            variant="filled"
            type="password"
            passwordToggle
            required
          />
          <InputField
            label="Email"
            placeholder="someone@example.com"
            invalid
            errorMessage="Please enter a valid email"
            variant="ghost"
            size="lg"
          />
          <InputField label="Loading state" loading placeholder="Fetching..." />
          <InputField label="Disabled" disabled value="Readonly" />
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-60"
              onClick={() => {
                setLoading(true)
                setTimeout(() => {
                  setRows((r) => r.concat({ id: Date.now(), name, email: name.toLowerCase()+'@mail.com', age: Math.floor(Math.random()*60)+20 }))
                  setLoading(false)
                }, 800)
              }}
            >
              Add Random Row
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gray-200"
              onClick={() => setRows([])}
            >
              Clear Rows
            </button>
          </div>

          <DataTable<Person>
            data={rows}
            columns={columns}
            selectable
            loading={loading}
            onRowSelect={(s) => console.log('Selected:', s)}
          />
        </div>
      </section>
    </div>
  )
}
