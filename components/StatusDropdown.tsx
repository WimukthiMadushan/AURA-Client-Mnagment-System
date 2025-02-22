import { Select } from '@radix-ui/themes';
import React, { useState, useEffect } from 'react';

interface StatusDropdownProps {
  setSelectedStatus: (value: string) => void;
  currentStatus: string; 
  filter: string
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ setSelectedStatus, currentStatus , filter}) => {
  const [selectedStatus, setStatus] = useState(currentStatus);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setSelectedStatus(value);
  };

  return (
    <Select.Root value={selectedStatus} onValueChange={handleStatusChange}>
      <Select.Trigger aria-label="Filter by status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {filter && <Select.Item value="All">All</Select.Item>}
          <Select.Item value="Returned All Components">Returned All Components</Select.Item>
          <Select.Item value="Not Yet Returned">Not Yet Returned</Select.Item>
          <Select.Item value="Has Problems">Has Problems</Select.Item>
          <Select.Item value="No Components Hired">No Components Hired</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusDropdown;
