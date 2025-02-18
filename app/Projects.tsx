import ProjectCard from '@/components/ProjectCard';
import StatusDropdown from '@/components/StatusDropdown';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text, Box, Container, TextField, Select, Dialog } from '@radix-ui/themes';
import React, { useState } from 'react';

const Projects = () => {
  const projects = [
    { projectName: "Project 01", projectDescription: "ML Project", status: "Not Yet Returned" },
    { projectName: "Project 02", projectDescription: "Web Development", status: "Has Problems" },
    { projectName: "Project 03", projectDescription: "Mobile App Development", status: "Not Yet Returned" },
    { projectName: "Project 04", projectDescription: "Data Analysis", status: "Has Problems" },
    { projectName: "Project 05", projectDescription: "Game Development", status: "Returned All Components" },
    { projectName: "Project 06", projectDescription: "UI/UX Design", status: "Has Problems" },
    { projectName: "Project 07", projectDescription: "Blockchain Project", status: "Not Yet Returned" },
    { projectName: "Project 08", projectDescription: "Cloud Computing", status: "Has Problems" },
    { projectName: "Project 09", projectDescription: "Cybersecurity Research", status: "Not Yet Returned" },
    { projectName: "Project 10", projectDescription: "IoT Project", status: "Has Problems" },
    { projectName: "Project 11", projectDescription: "AI Research", status: "Not Yet Returned" },
    { projectName: "Project 12", projectDescription: "Data Science", status: "Has Problems" },
    { projectName: "Project 13", projectDescription: "Augmented Reality", status: "Not Yet Returned" },
    { projectName: "Project 14", projectDescription: "Automation", status: "Has Problems" },
    { projectName: "Project 15", projectDescription: "VR Development", status: "Not Yet Returned" },
    { projectName: "Project 16", projectDescription: "Smart Cities", status: "Returned All Components" },
    { projectName: "Project 17", projectDescription: "Natural Language Processing", status: "Not Yet Returned" },
    { projectName: "Project 18", projectDescription: "Robotics", status: "Has Problems" },
    { projectName: "Project 19", projectDescription: "Digital Marketing", status: "Not Yet Returned" },
    { projectName: "Project 20", projectDescription: "Edge Computing", status: "Has Problems" },
    { projectName: "Project 21", projectDescription: "Voice Recognition", status: "Not Yet Returned" },
    { projectName: "Project 22", projectDescription: "E-commerce Development", status: "Has Problems" },
    { projectName: "Project 23", projectDescription: "5G Networks", status: "Not Yet Returned" },
    { projectName: "Project 24", projectDescription: "Healthcare Analytics", status: "Has Problems" },
    { projectName: "Project 25", projectDescription: "AI Ethics", status: "Not Yet Returned" },
    { projectName: "Project 26", projectDescription: "SaaS Development", status: "Has Problems" },
    { projectName: "Project 27", projectDescription: "Data Visualization", status: "Not Yet Returned" },
    { projectName: "Project 28", projectDescription: "FinTech", status: "Has Problems" },
    { projectName: "Project 29", projectDescription: "Augmented Reality Games", status: "Not Yet Returned" },
    { projectName: "Project 30", projectDescription: "Wearable Tech", status: "Has Problems" }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <Container>
      <Box className="w-full flex flex-col justify-center items-center">
        <Box className="w-full mb-4 pl-[16rem]">
          <Flex direction="column" gap="4" align="center">
            <Box className="w-full">
              <Flex gap="3" align="center" direction="row" className="w-full">
                <Box className="w-full max-w-[400px]">
                  <TextField.Root placeholder="Search Projects…">
                    <TextField.Slot>
                      <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                  </TextField.Root>
                </Box>
                <Box className="w-full max-w-[200px]">
                  <StatusDropdown/>
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
				        <TextField.Root placeholder="Enter Project name"/>
			          </label>
			          <label>
				          <Text as="div" size="2" mb="1" weight="bold">
					          What is the Field
				          </Text>
				          <TextField.Root placeholder="Enter field of the Project"/>
			          </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
					          Enter Status
				          </Text>
                  <StatusDropdown/>
                </label>
		          </Flex>

		          <Flex gap="3" mt="4" justify="end">
			            <Dialog.Close>
				            <Button variant="soft" color="gray">Cancel</Button>
			            </Dialog.Close>
			            <Dialog.Close>
				            <Button>Save</Button>
			            </Dialog.Close>
		          </Flex>
	            </Dialog.Content>
</Dialog.Root>

            </Box>
          </Flex>
        </Box>

        <ProjectCard projects={currentProjects} />

        <Flex justify="center" gap="2" mt="4" mb='4'>
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            variant="soft"
            color="gray"
          >
            Previous
          </Button>
          <Box mt="1">
            <Text>
              Page No {currentPage} of {totalPages}
            </Text>
          </Box>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="soft"
            color="gray"
          >
            Next
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};

export default Projects;
