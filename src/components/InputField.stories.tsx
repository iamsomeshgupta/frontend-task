import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { InputField, InputFieldProps } from './InputField'

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof InputField>

export const Playground: Story = {
  render: (args: InputFieldProps) => {
    const [val, setVal] = useState('')
    return <InputField {...args} value={val} onChange={(e) => setVal(e.target.value)} />
  },
  args: {
    label: 'Label',
    placeholder: 'Type here...',
    helperText: 'Some helper copy',
    variant: 'outlined',
    size: 'md',
    clearable: true,
  },
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField label="Default" placeholder="Hello" />
      <InputField label="Invalid" placeholder="Email" invalid errorMessage="Invalid email" />
      <InputField label="Loading" loading placeholder="Loading..." />
      <InputField label="Disabled" disabled value="Readonly" />
      <InputField label="Password" type="password" passwordToggle />
    </div>
  ),
}
