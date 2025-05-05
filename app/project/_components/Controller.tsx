'use client';
import { Box, Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import CompanyStatusDropdown from './CompanyStatusDropdown';
import DatePicker from './DatePicker';
import { useParams } from 'next/navigation';
import { arrayUnion } from 'firebase/firestore';
import { addData} from '@/lib/firestoreOperations';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

interface ControllerProps {
  controllername: string;
  label: string;
  description: string;
  status: 'projectManager' | 'client' | 'component';
  fetchProject: () => void;
}

const Controller = ({ controllername, label, description, status, fetchProject }: ControllerProps) => {
  const { id } = useParams();
  const projectId = id as string;

  const [formData, setFormData] = useState({
    id:'',
    name: '',
    email: '',
    nic: '',
    employmentStatus: 'Company Owner',
    company: '',
    mobile:'',
    componentName: '',
    startDate: '',
    endDate: '',
    returnedDate: '',
    panelty: 0,
    dailyRentalCost: 0,
    dailyPaneltyCost: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!projectId) {
      toast.info('Please select a project first');
      return;
    }

    let dataToSave;

    if (status === "projectManager") {
      dataToSave = {
        ProjectManager: arrayUnion({
          id: Math.random().toString(36).substr(2, 9),
          Name: formData.name,
          Email: formData.email,
          EmploymentStatus: formData.employmentStatus,
          Company: formData.company,
          Mobile:formData.mobile
        }),
      };
    } else if (status === "client") {
      dataToSave = {
        Clients: arrayUnion({
          id: Math.random().toString(36).substr(2, 9),
          Name: formData.name,
          Email: formData.email,
          NIC: formData.nic,
        }),
      };
    } else if (status === "component") {
      // Prepare the component object to add to the Components array
      dataToSave = {
        Components: arrayUnion({
          id: Math.random().toString(36).substr(2, 9),
          componentName: formData.componentName,
          startDate: formData.startDate,
          endDate: formData.endDate,
          returnedDate: formData.returnedDate,
          panelty: 0,
          dailyRentalCost: formData.dailyRentalCost,
          dailyPaneltyCost: formData.dailyPaneltyCost,
        }),
      };
    }

    try {
      await addData(Number(projectId), dataToSave, status);
      setFormData({
        id: Math.random().toString(36).substr(2, 9),
        name: "",
        email: "",
        nic: "",
        employmentStatus: "Company Owner",
        company: "",
        mobile:"",
        componentName: "",
        startDate: "",
        endDate: "",
        returnedDate: "",
        panelty: 0,
        dailyRentalCost: 0,
        dailyPaneltyCost: 0,
      });
      fetchProject();

    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="soft" color="blue">{controllername}</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>{label}</Dialog.Title>
        <Dialog.Description size="2" mb="4">{description}</Dialog.Description>
        
        <Flex direction="column" gap="3">
          {/* Engineer & Client Fields */}
          {status !== 'component' && (
            <Box>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">Name</Text>
                <TextField.Root name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange} />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">Email</Text>
                <TextField.Root name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
              </label>
            </Box>
          )}
          
          {/* Client Specific Fields */}
          {status === 'client' && (
            <Box>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">NIC</Text>
                <TextField.Root name="nic" placeholder="Enter NIC" value={formData.nic} onChange={handleChange} />
              </label>
            </Box>
          )}

          {/* Engineer Specific Fields */}
          {status === 'projectManager' && (
            <Box>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">Company</Text>
                <TextField.Root name="company" placeholder="Enter company name" value={formData.company} onChange={handleChange} />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">Mobile</Text>
                <TextField.Root name="mobile" placeholder="Enter Mobile Number" value={formData.mobile} onChange={handleChange} />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">Employment Status</Text>
                <CompanyStatusDropdown onChange={(value) => setFormData((prev) => ({ ...prev, employmentStatus: value }))} />
              </label>  
            </Box>
          )}

          {/* Component Fields */}
          {status === 'component' && (
            <Box>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">Component Name</Text>
                <TextField.Root name="componentName" placeholder="Enter Component Name" value={formData.componentName} onChange={handleChange} />
              </label>
              <label>
                <Text as="div" size="2" mb="1" mt="2" weight="bold">Daily Rental Cost</Text>
                <TextField.Root name="dailyRentalCost" placeholder="Enter Daily Rental Cost" value={formData.dailyRentalCost} onChange={handleChange} />
              </label>
              <label>
  <Text as="div" size="2" mb="1" mt="2" weight="bold">Daily Penalty Cost</Text>
  <TextField.Root
    name="dailyPaneltyCost"
    placeholder="Enter Daily Penalty Cost"
    value={formData.dailyPaneltyCost}
    onChange={handleChange}
  />
</label>

              <Flex gapX="3" mt="3">
                <label className="flex-1">
                  <Text as="div" size="2" mb="1" weight="bold">Start Date</Text>
                  <DatePicker onChange={(date) => setFormData((prev) => ({ ...prev, startDate: format(date, 'yyyy-MM-dd') }))} />
                </label>
                <label className="flex-1">
                  <Text as="div" size="2" mb="1" weight="bold">End Date</Text>
                  <DatePicker onChange={(date) => setFormData((prev) => ({ ...prev, endDate: format(date, 'yyyy-MM-dd') }))} />
                </label>
              </Flex>
            </Box>
          )}
        </Flex>

        {/* Buttons */}
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">Cancel</Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSave}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Controller;
