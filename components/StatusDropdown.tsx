import { Select } from '@radix-ui/themes';
import React, { useState } from 'react';

const StatusDropdown = () => {
  const [selectedStatus, setSelectedStatus] = useState('Not Yet Returned');

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  return (
    <Select.Root value={selectedStatus} onValueChange={handleStatusChange}>
      <Select.Trigger aria-label="Filter by status.."/>
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          <Select.Item value="Returned All Components">Returned All Components</Select.Item>
          <Select.Item value="Not Yet Returned">Not Yet Returned</Select.Item>
          <Select.Item value="Has Problems">Has Problems</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusDropdown;
