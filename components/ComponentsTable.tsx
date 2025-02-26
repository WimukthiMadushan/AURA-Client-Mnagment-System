'use client';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { AlertDialog, Badge, Button, Callout, Card, Container, Flex } from "@radix-ui/themes";
import { Trash2Icon } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { format, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { deleteComponentById } from "@/lib/firestoreOperations";
import { useAuth } from "@/app/Hooks/AuthContextHook";
import { toast } from "react-toastify";

interface ComponentsTableProps {
  components: {
    id: string;
    componentName: string;
    startDate: string;
    endDate: string;
    returnedDate?: string;
    panelty?: number;
  }[];
  fetchProject: () => void;
}

const ComponentsTable = ({ components, fetchProject }: ComponentsTableProps) => {
  const [componentsState, setComponentsState] = useState(components);

  const {role} = useAuth();

  // Function to calculate penalty based on end date and returned date
  const calculatePenalty = (endDate: string, returnedDate?: string) => {
    const today = new Date();
    const endDateObj = new Date(endDate);
    const returnDateObj = returnedDate ? new Date(returnedDate) : today;

    // No penalty if returned date is earlier than or equal to the end date
    if (returnDateObj <= endDateObj) {
      return 0;
    }

    // If returned after the end date, calculate penalty based on the returned date
    const daysLate = differenceInDays(returnDateObj, endDateObj);
    return daysLate * 100;
  };

  useEffect(() => {
    const updatedComponents = components.map((component) => ({
      ...component,
      panelty: calculatePenalty(component.endDate, component.returnedDate),
    }));
    setComponentsState(updatedComponents);
  }, [components]); 

  // Calculate total penalty
  const totalPenalty = componentsState.reduce((sum, component) => sum + (component.panelty || 0), 0);

  // Determine status based on end date
  const getStatus = (endDate: string) => {
    return new Date(endDate) >= new Date() ? "Have Time" : "Overdue";
  };

  // Handle returned date change
  const handleReturnedDateChange = async (index: number, date: Date) => {
    const updatedComponents = [...componentsState];
    const returnedDateString = format(date, "yyyy-MM-dd"); // Convert date to string

    updatedComponents[index].returnedDate = returnedDateString;
    updatedComponents[index].panelty = calculatePenalty(updatedComponents[index].endDate, returnedDateString);
    setComponentsState(updatedComponents);  // Update state with new returned date
  };

  // Handle component deletion
  const handleDeleteComponent = async (id: string) => {
    try {
      await deleteComponentById(id);
      const updatedComponents = componentsState.filter((component) => component.id !== id);
      setComponentsState(updatedComponents);
      toast.success("Component deleted successfully!", { position: "bottom-right" });
      fetchProject();
    } catch (error) {
      console.error("Error deleting component:", error);
      toast.error("An error occurred while deleting the component.", { position: "bottom-right" });
    }
  };

  return (
    <Container>
      {totalPenalty > 0 ? (
        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>You have a penalty of Rs. {totalPenalty}</Callout.Text>
        </Callout.Root>
      ) : (
        <Callout.Root color="green">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>You are good, no penalty. Keep it up!</Callout.Text>
        </Callout.Root>
      )}

      <Card my="4">
        <Table>
          <TableCaption>A list of your Renting Components.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Component Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Penalty (LKR)</TableHead>
              {role === 'admin' && (
                <>
                  <TableHead>Returned Date</TableHead>
                  <TableHead>Actions</TableHead>
                </>) 
                }
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {componentsState.map((component, index) => (
              <TableRow key={index}>
                <TableCell>{component.componentName}</TableCell>
                <TableCell>{component.startDate}</TableCell>
                <TableCell>{component.endDate}</TableCell>
                <TableCell>
                  <Badge color={getStatus(component.endDate) === "Have Time" ? "green" : "red"}>
                    {getStatus(component.endDate)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {component.panelty === 0 ? "No Penalty" : `Rs. ${component.panelty}`}
                </TableCell>
                { role === 'admin' && (
                  <>
                    <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="2" className="w-[70%]">
                          {component.returnedDate ? format(new Date(component.returnedDate), "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className={cn("w-auto p-0 mt-2 rounded-lg shadow-lg", "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600")}
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={component.returnedDate ? new Date(component.returnedDate) : undefined}
                          onSelect={(date) => handleReturnedDateChange(index, date!)}
                          initialFocus />
                      </PopoverContent>
                    </Popover>
                  </TableCell><TableCell>
                      <AlertDialog.Root>
                        <AlertDialog.Trigger>
                          <Button size="2" variant="soft" color="red" className="rounded-full hover:bg-red-200">
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
                            <AlertDialog.Action onClick={() => handleDeleteComponent(component.id)}>
                              <Button variant="solid" color="red">
                                Delete
                              </Button>
                            </AlertDialog.Action>
                          </Flex>
                        </AlertDialog.Content>
                      </AlertDialog.Root>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
            <TableRow style={{ fontWeight: 'bold' }}>
              <TableCell>Total Penalty</TableCell>
              <TableCell colSpan={3} className="text-right">{`Rs. ${totalPenalty}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};

export default ComponentsTable;
