'use client';
import { useAuth } from '@/app/Hooks/AuthContextHook';
import { getProjects } from '@/lib/firestoreOperations';
import { Button, Dialog, Flex, Text, TextField, Select } from '@radix-ui/themes';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


interface Project {
  id: number;
  projectName: string;
  projectDescription: string;
  status: string;
  Engineers:  {EmploymentStatus: String, Email: String, Company: String, Name: String}[]
}

const RegisterMembers = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const { registerUser } = useAuth();

  const handleFetchProjects = async () => {
    fetchProjects();
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    fetchProjects();
    try {
      await registerUser(email, password, role);
      toast.success(`User registered successfully as ${role}!`, { position: "bottom-right" });
    } catch (error: any) {
      toast.error(error.message, { position: "bottom-right" });
    }
  };

  const fetchProjects = async () => {
    try {
      const fetchedProjects: Project[] = await getProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="soft" color="blue" onClick={handleFetchProjects}>Register Members</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Register</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Create a new member by filling in the details below.
        </Dialog.Description>

        <form onSubmit={handleSignup}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Root 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Password
              </Text>
              <TextField.Root 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </label>

            {/* Role Dropdown */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Role
              </Text>
              <Select.Root value={role} onValueChange={setRole}>
                <Select.Trigger/>
                <Select.Content>
                  <Select.Item value="user">Project Name</Select.Item>
                  {projects.map((project) => (
                    <Select.Item key={project.id} value={project.projectName}>
                      {project.projectName}
                    </Select.Item>
                  ))} 
                </Select.Content>
              </Select.Root>
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button variant="solid" type="submit">Register</Button>
            </Dialog.Close> 
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default RegisterMembers;
