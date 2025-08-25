import type { Meta, StoryObj } from '@storybook/react'
import { DataTable, Column } from './DataTable'

type Person = { id: number; name: string; email: string; age: number }

const meta: Meta<typeof DataTable<Person>> = {
  title: 'Components/DataTable',
  component: DataTable<Person> as any,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof DataTable<Person>>

const data: Person[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@calc.org', age: 36 },
  { id: 2, name: 'Grace Hopper', email: 'grace@navy.mil', age: 85 },
  { id: 3, name: 'Alan Turing', email: 'alan@bletchley.uk', age: 41 },
]

const columns: Column<Person>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
]

export const Basic: Story = {
  args: {
    data,
    columns,
    selectable: true,
  },
}

export const Loading: Story = {
  args: {
    data,
    columns,
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
}
