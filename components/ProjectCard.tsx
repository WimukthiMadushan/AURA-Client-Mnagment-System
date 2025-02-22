import { Box, Card, Badge, Flex, Text, Button, AlertDialog } from "@radix-ui/themes";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Project {
  id: number;
  projectName: string;
  projectDescription: string;
  status: string;
}

interface ProjectCardProps {
  projects: Project[];
  deleteProject: (id: number) => void;
}

const ProjectCard = ({ projects, deleteProject }: ProjectCardProps) => {
  const getBadgeColor = (status: string) => {
    switch (status) {
      case "Returned All Components":
        return "green";
      case "Has Problems":
        return "red";
      case "Not Yet Returned":
        return "orange";
      case "No Components Hired":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <Box className="w-[40rem]">
      {projects.map((project) => (
        <Box
          key={project.id}
          maxWidth="840px"
          mb="2"
          className="pointer hover:scale-105 transition-all duration-300"
        >
          <Card className="cursor-pointer">
            <Flex gap="3" align="center" justify="between" pr="6">
              <Link href={`/project/${project.id}`} passHref className="w-full">
                <Box className="w-full">
                  <Text as="div" size="2" weight="bold">
                    {project.projectName}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {project.projectDescription}
                  </Text>
                  <Badge color={getBadgeColor(project.status)}>
                    {project.status}
                  </Badge>
                </Box>
              </Link>

              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Button
                    size="2"
                    variant="soft"
                    color="red"
                    className="rounded-full hover:bg-red-200 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash2Icon color="red" />
                  </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                  <AlertDialog.Title>Delete Project</AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    Are you sure you want to delete this project? This action cannot be undone.
                  </AlertDialog.Description>

                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray">Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                      <Button
                        variant="solid"
                        color="red"
                        onClick={() => deleteProject(project.id)}
                      >
                        Delete
                      </Button>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
            </Flex>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default ProjectCard;
