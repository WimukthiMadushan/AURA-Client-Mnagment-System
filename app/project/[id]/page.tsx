'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Box, Callout, Container, Flex, Text } from '@radix-ui/themes';
import ComponentsTable from '@/components/ComponentsTable';
import DataListComponent from '@/components/DataList';
import Controller from './../_components/Controller';
import { getProjectFromId } from '@/lib/firestoreOperations';
import { ShieldCheck } from 'lucide-react';
import ProjectPageLoadingSkelton from '../_components/ProjectPageLoadingSkelton';
import { useAuth } from '@/app/Hooks/AuthContextHook';

interface ProjectManager {
  Email: String;
  Company: String;
  Name: String;
  Mobile: String;
}

interface Client {
  NIC: String;
  Email: String;
  Name: String;
}

interface Component {
  id: String;
  componentName: String;
  startDate: String;
  endDate: String;
  returnedDate: String;
  panelty: number;
 }

interface Project {
  id: number;
  projectName: String;
  projectDescription: String;
  status: String;
  ProjectManager: ProjectManager;
  Clients: Client[];
  Components: Component[];
}

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<String | null>(null);

  const { role } = useAuth();

  const fetchProject = async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const fetchedData = await getProjectFromId(Number(id));
      //console.log("Main Page",fetchedData)
      setProject(fetchedData || null);
    } catch (err) {
      setError('Failed to fetch project data.');
      setProject(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  return (
    <Container>
      {isLoading ? (
        <ProjectPageLoadingSkelton/>
      ) : error ? (
        <Text size="4" color="red">
          {error}
        </Text>
      ) : (
        <>
          <Text as="div" size="6" weight="bold" className="mb-4">
            {project?.projectName || 'Project Not Found'}
          </Text>
          <Flex className="mb-4">
            {/* Engineers Section */}
            <Box className="w-[30rem]">
              <Text as="div" size="4" weight="bold" className="mb-4">
                Assigned Project Manager
              </Text>
              {project?.ProjectManager ? (
                  <DataListComponent key={project.ProjectManager[0].Email} data={project.ProjectManager[0]} type="projectManager" />
              ) : (
                <Text as="div" size="3" color="gray">
                  No Project Manager Assigned
                </Text>
              )}
            </Box>

            {/* Clients Section */}
            <Box className="w-[30rem]">
              <Text as="div" size="4" weight="bold" className="mb-4">
                Clients
              </Text>
              {project?.Clients?.length ? (
                project.Clients.map((client) => (
                  <DataListComponent key={client.Email} data={client} type="client" />
                ))
              ) : (
                <Text as="div" size="3" color="gray">
                  No Clients Assigned
                </Text>
              )}
            </Box>

                {/* Controllers Section */}
                {role == 'admin' && (
                   <Box className="w-[15rem]">
              <Text as="div" size="4" weight="bold" className="mb-4">
                Controllers
              </Text>
              <Flex direction="column" gap="2">
                <Controller status="projectManager" controllername="Add Project Manager" label="Add a New Project Manager" description="Here You can Add Project Manager" fetchProject={fetchProject}/>
                <Controller status="client" controllername="Add Clients" label="Add a New Client" description="Here You can Add Clients" fetchProject={fetchProject}/>
                <Controller status="component" controllername="Add Component" label="Add a New Component" description="Here You can Add Components" fetchProject={fetchProject}/>
              </Flex>
            </Box>)} 
          </Flex>

          {/* Components Table */}
          {project?.Components?.length ? (
            <ComponentsTable components={project.Components} fetchProject={fetchProject} />
          ) : (
                 <Callout.Root color='blue'>
	                  <Callout.Icon>
		                  <ShieldCheck/>
	                  </Callout.Icon>
	                  <Callout.Text>
		                  No Components hired
	                  </Callout.Text>
                </Callout.Root>
          )}
        </>
      )}
    </Container>
  );
};

export default ProjectDetailsPage;