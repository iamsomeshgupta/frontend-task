import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import React from 'react'
import { InputField } from '../InputField'

describe('InputField', () => {
  it('renders label and updates value', () => {
    const Wrapper = () => {
      const [v, setV] = React.useState('')
      return <InputField label="Name" value={v} onChange={(e) => setV(e.target.value)} />
    }
    render(<Wrapper />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    const input = screen.getByLabelText('Name') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Ada' } })
    expect(input.value).toBe('Ada')
  })
})
