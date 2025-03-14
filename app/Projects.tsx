import ProjectCard from '@/components/ProjectCard';
import StatusDropdown from '@/components/StatusDropdown';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text, Box, Container, TextField, Dialog } from '@radix-ui/themes';
import React, { useState, useEffect } from 'react';
import { getProjects, addProject, deleteProjectFromFirestoreById } from '@/lib/firestoreOperations';
import LoadingSkelton from '@/components/LoadingSkelton';
import { useAuth } from './Hooks/AuthContextHook';
import { toast } from 'react-toastify';

interface Project {
  id: number;
  projectName: string;
  projectDescription: string;
  status: string;
  ProjectManager: { Email: string; Company: string; Name: string; Mobile: string };
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    projectName: '',
    projectField: '',
    status: 'Not Yet Returned'
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterdStatus, setFilterdStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  const { role } = useAuth();
  console.log(role);

  useEffect(() => {
    setIsLoading(true);

    const fetchProjects = async () => {
      try {
        const fetchedProjects: Project[] = await getProjects();

        if (role === 'admin') {
          setProjects(fetchedProjects);
        } else {
          const filteredProjects = fetchedProjects.filter(
            (project) => project.projectName === role
          );
          console.log(filteredProjects);
          setProjects(filteredProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [role]);

  // Handle project addition
  const handleAddProject = async () => {
    const newProject = {
      id: projects.length + 1,
      projectName: formData.projectName,
      projectDescription: formData.projectField,
      status: formData.status,
    };
    try {
      await addProject(newProject);
      setFormData({ projectName: '', projectField: '', status: 'Not Yet Returned' });
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
      toast.success('Project added successfully',{position: "bottom-right"} );
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('Error adding project',{position: "bottom-right"});
    }
  };

  // Delete project
  const deleteProject = async (id: number) => {
    try {
      await deleteProjectFromFirestoreById(id);
      const updatedProjects = projects.filter(project => project.id !== id);
      setProjects(updatedProjects);
      toast.success('Project deleted successfully',{position: "bottom-right"});
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Error deleting project',{position: "bottom-right"});
    }
  };

  // Apply filter and search term on every change
  const filteredProjects = projects.filter((project) => {
    const matchesSearchTerm = project.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = project.status === filterdStatus || filterdStatus === 'All';
    return matchesSearchTerm && matchesStatus;
  });

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <Container>
      <Box className="w-full flex flex-col justify-center items-center">
        {role === 'admin' ? (
  <Box className="w-full mb-4 pl-[15.5rem]">
    <Flex direction="column" gap="4" align="center">
      <Box className="w-full">
        <Flex gap="3" align="center" className="w-full">
          <Box className="w-full max-w-[400px]">
            <TextField.Root placeholder="Search Projects…" onChange={(e) => setSearchTerm(e.target.value)}>
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Box>
          <Box className="w-full max-w-[200px]">
            <StatusDropdown filter="filter" currentStatus={filterdStatus} setSelectedStatus={setFilterdStatus} />
          </Box>
        </Flex>
      </Box>

      <Box className="w-full">
        <Dialog.Root>
          <Dialog.Trigger>
            <Button size="2" variant="soft" color="indigo">
              Add Project
            </Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Add New Project</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Add a new Project and track renting details.
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Project Name
                </Text>
                <TextField.Root
                  name="projectName"
                  placeholder="Enter Project name"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  What is the Field
                </Text>
                <TextField.Root
                  name="projectField"
                  placeholder="Enter field of the Project"
                  value={formData.projectField}
                  onChange={(e) => setFormData({ ...formData, projectField: e.target.value })}
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Enter Status
                </Text>
                <StatusDropdown
                  filter=""
                  currentStatus={formData.status}
                  setSelectedStatus={(status) => setFormData({ ...formData, status })}
                />
              </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">Cancel</Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button onClick={handleAddProject}>Save</Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </Box>
    </Flex>
  </Box>
) : (
  role === null ? (
    <Text size="3" mb="4">
      First Login to Your Account using Credentials which we have provided.<br />
      Once You logged in the to the system You can see your project
    </Text>
  ) : null
)}

        {isLoading && role ? <LoadingSkelton /> : <ProjectCard projects={currentProjects} deleteProject={deleteProject} />}

        {totalPages > 1 && (
          <Flex justify="center" gap="2" mt="4" mb="4">
            <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} variant="soft" color="gray">
              Previous
            </Button>
            <Text mt="1">Page {currentPage} of {totalPages}</Text>
            <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage >= totalPages} variant="soft" color="gray">
               Next
            </Button>
          </Flex>
        )}
      </Box>
    </Container>
  );
};

export default Projects;
