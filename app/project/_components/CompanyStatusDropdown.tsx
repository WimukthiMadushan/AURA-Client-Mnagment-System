
import { Select } from '@radix-ui/themes'
import React, { useState } from 'react'

const CompanyStatusDropdown = () => {
  const [selectedStatus, setSelectedStatus] = useState('Company Owner');

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };
  return (
    <Select.Root value={selectedStatus} onValueChange={handleStatusChange}>
      <Select.Trigger aria-label="Select status.."/>
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          <Select.Item value="Company Owner">Company Owner</Select.Item>
          <Select.Item value="Employer">Employer</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default CompanyStatusDropdown