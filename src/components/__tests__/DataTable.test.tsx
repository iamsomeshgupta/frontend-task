import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import React from 'react'
import { DataTable, Column } from '../DataTable'

type Person = { id: number; name: string; email: string; age: number }

const columns: Column<Person>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
]

const data: Person[] = [
  { id: 1, name: 'B', email: 'b@x.com', age: 20 },
  { id: 2, name: 'A', email: 'a@x.com', age: 30 },
]

describe('DataTable', () => {
  it('sorts by column when header is clicked', () => {
    render(<DataTable<Person> data={data} columns={columns} />)
    const header = screen.getByText('Name')
    fireEvent.click(header) 
    const rows = screen.getAllByRole('row')
   
    expect(rows[1].textContent).toContain('A')
  })
})
