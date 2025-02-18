import { Box, Card, Badge, Flex, Text } from '@radix-ui/themes';
import React from 'react';

interface project {
  projectName: string;
  projectDescription: string;
  status:string
}

interface projectCardProps {
  projects: project[];
}

const ProjectCard = ({ projects }: projectCardProps) => {
  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'Returned All Components':
        return 'green'; 
      case 'Has Problems':
        return 'red'; 
      case 'Not Yet Returned':
        return 'orange'; 
      default:
        return 'gray'; 
    }
  };

  return (
    <Box className='w-[40rem]'>
      {projects.map((project, index) => (
        <Box
          key={index}
          maxWidth="840px"
          mb="2"
          className="pointer hover:scale-105 transition-all duration-300"
        >
          <Card>
            <Flex gap="3" align="center">
              <Box>
                <Text as="div" size="2" weight="bold">
                  {project.projectName}
                </Text>
                <Text as="div" size="2" color="gray">
                  {project.projectDescription}
                </Text>
                <Badge color={getBadgeColor(project.status)}>{project.status}</Badge>
              </Box>
            </Flex>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default ProjectCard;
