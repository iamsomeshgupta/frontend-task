import React, { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  emptyText?: string
  className?: string
}

type SortState<T> = { key: keyof T; asc: boolean } | null

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
  emptyText = 'No data',
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState<T>>(null)
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const sortedData = useMemo(() => {
    if (!sort) return data
    const copy = [...data]
    copy.sort((a, b) => {
      const va = a[sort.key]
      const vb = b[sort.key]
      if (va == null && vb == null) return 0
      if (va == null) return sort.asc ? -1 : 1
      if (vb == null) return sort.asc ? 1 : -1
      if (typeof va === 'number' && typeof vb === 'number') {
        return sort.asc ? va - vb : vb - va
      }
      return sort.asc
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va))
    })
    return copy
  }, [data, sort])

  function toggleSort(col: Column<T>) {
    if (!col.sortable) return
    const key = col.dataIndex as keyof T
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, asc: true }
      if (prev.asc) return { key, asc: false }
      return null
    })
  }

  function toggleRow(idx: number) {
    if (!selectable) return
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      onRowSelect?.(Array.from(next).map(i => sortedData[i]))
      return next
    })
  }

  function toggleAll() {
    if (!selectable) return
    setSelected((prev) => {
      if (prev.size === sortedData.length) {
        onRowSelect?.([])
        return new Set()
      }
      const all = new Set(sortedData.map((_, i) => i))
      onRowSelect?.(sortedData)
      return all
    })
  }

  return (
    <div className={cn('w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700', className)}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {selectable && (
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                <input
                  aria-label="Select all rows"
                  type="checkbox"
                  checked={selected.size === sortedData.length && sortedData.length > 0}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((col) => {
              const isActive = sort && sort.key === (col.dataIndex as keyof T)
              const dir = isActive ? (sort!.asc ? 'asc' : 'desc') : undefined
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={dir}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider select-none',
                    col.sortable && 'cursor-pointer'
                  )}
                  onClick={() => toggleSort(col)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.title}
                    {col.sortable && (
                      <span aria-hidden className="text-xs">
                        {isActive ? (sort!.asc ? '▲' : '▼') : '↕'}
                      </span>
                    )}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {loading ? (
            <tr>
              <td
                className="px-4 py-6 text-center text-sm text-gray-500"
                colSpan={columns.length + (selectable ? 1 : 0)}
                aria-busy="true"
              >
                Loading...
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                className="px-4 py-6 text-center text-sm text-gray-500"
                colSpan={columns.length + (selectable ? 1 : 0)}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            sortedData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                {selectable && (
                  <td className="px-4 py-3">
                    <input
                      aria-label={`Select row ${i + 1}`}
                      type="checkbox"
                      checked={selected.has(i)}
                      onChange={() => toggleRow(i)}
                    />
                  </td>
                )}
                {columns.map((col) => {
                  const value = row[col.dataIndex]
                  return (
                    <td key={String(col.key)} className="px-4 py-3 text-sm text-gray-800 dark:text-gray-100">
                      {col.render ? col.render(value, row) : String(value ?? '')}
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
