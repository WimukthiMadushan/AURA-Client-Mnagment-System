'use client';

import { Table, TableBody,TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Badge, Button, Callout, Card, Flex ,Box} from "@radix-ui/themes";
import { Trash2Icon } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { format, differenceInDays } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { deleteComponentById, updateReturnedDate } from "@/lib/firestoreOperations";
import { useAuth } from "@/app/Hooks/AuthContextHook";
import { toast } from "react-toastify";

interface ComponentsTableProps {
  components: {
    id: string;
    componentName: string;
    startDate: string;
    endDate: string;
    returnedDate?: string;
    penalty?: number;
    dailyRentalCost?: number;
    dailyPaneltyCost?: number;
  }[];
  fetchProject: () => void;
}

const ComponentsTable = ({ components, fetchProject }: ComponentsTableProps) => {
  const [componentsState, setComponentsState] = useState(components);
  const { role } = useAuth();

  const calculatePenalty = (endDate: string, returnedDate?: string, dailyPanelty?:number) => {
    const today = new Date();
    const endDateObj = new Date(endDate);
    const returnDateObj = returnedDate ? new Date(returnedDate) : today;

    if (returnDateObj <= endDateObj) return 0;

    const daysLate = differenceInDays(returnDateObj, endDateObj);
    return daysLate * (dailyPanelty || 0);
  };

  const calculateHiredCost = (startDate: string, endDate: string, returnedDate?: string, dailyRentalCost?: number) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const returned = returnedDate ? new Date(returnedDate) : end;

    const dailyRate = dailyRentalCost || 0; 

    return Math.max(differenceInDays(returned, start), 0) * dailyRate;
  };

  useEffect(() => {
    const updatedComponents = components.map((component) => ({
      ...component,
      penalty: calculatePenalty(component.endDate, component.returnedDate, component.dailyPaneltyCost),
    }));
    setComponentsState(updatedComponents);
  }, [components]);

  const totalPenalty = componentsState.reduce((sum, component) => sum + (component.penalty || 0), 0);

  const totalOverallCost = componentsState.reduce((sum, component) => {
    const hiredCost = calculateHiredCost(component.startDate, component.endDate, component.returnedDate, component.dailyRentalCost);
    return sum + hiredCost + (component.penalty || 0);
  }, 0);

  const getStatus = (endDate: string) => {
    return new Date(endDate) >= new Date() ? "Have Time" : "Overdue";
  };

  const handleReturnedDateChange = async (index: number, date: Date) => {
    if (!date) return;

    const returnedDateString = format(date, "yyyy-MM-dd");
    const updatedComponents = [...componentsState];
    const component = updatedComponents[index];

    component.returnedDate = returnedDateString;
    component.penalty = calculatePenalty(component.endDate, returnedDateString);

    setComponentsState(updatedComponents);

    const success = await updateReturnedDate(component.id, returnedDateString);
    if (success) {
      toast.success("Returned date updated successfully!", { position: "bottom-right" });
      fetchProject();
    } else {
      toast.error("An error occurred while updating the returned date.", { position: "bottom-right" });
    }
  };

  const handleDeleteComponent = async (id: string) => {
    try {
      await deleteComponentById(id);
      setComponentsState((prev) => prev.filter((component) => component.id !== id));
      toast.success("Component deleted successfully!", { position: "bottom-right" });
      fetchProject();
    } catch (error) {
      console.error("Error deleting component:", error);
      toast.error("An error occurred while deleting the component.", { position: "bottom-right" });
    }
  };

  return (
    <Box className="w-[100%]">
      <Callout.Root color={totalPenalty > 0 ? "red" : "green"}>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          {totalPenalty > 0 ? `You have a penalty of Rs. ${totalPenalty}` : "You are good, no penalty. Keep it up!"}
        </Callout.Text>
      </Callout.Root>

      <Card my="4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Component Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Daily Rental (LKR)</TableHead>
              <TableHead>Hired Cost (LKR)</TableHead>
              <TableHead>Daily Penalty(LKR)</TableHead>
              <TableHead>Total Penalty (LKR)</TableHead>
              <TableHead>Total Cost (LKR)</TableHead>
              {role === 'admin' && (
                <>
                  <TableHead>Returned Date</TableHead>
                  <TableHead>Actions</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {componentsState.map((component, index) => {
              const hiredCost = calculateHiredCost(component.startDate, component.endDate, component.returnedDate, component.dailyRentalCost || 0);
              const totalCost = hiredCost + (component.penalty || 0);

              return (
                <TableRow key={index}>
                  <TableCell>{component.componentName}</TableCell>
                  <TableCell>{component.startDate}</TableCell>
                  <TableCell>{component.endDate}</TableCell>
                  <TableCell>
                    <Badge color={getStatus(component.endDate) === "Have Time" ? "green" : "red"}>
                      {getStatus(component.endDate)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{ component.dailyRentalCost }</TableCell>
                  <TableCell className="text-center">{hiredCost}</TableCell>
                  <TableCell className="text-center">{component.dailyPaneltyCost}</TableCell>
                  <TableCell>{component.penalty === 0 ? "No Penalty" : `Rs. ${component.penalty}`}</TableCell>
                  <TableCell className="text-center">{totalCost}</TableCell>
                  {role === 'admin' && (
                    <>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline">{component.returnedDate ? format(new Date(component.returnedDate), "PPP") : "Pick a date"}</Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Calendar mode="single" selected={component.returnedDate ? new Date(component.returnedDate) : undefined} onSelect={(date) => handleReturnedDateChange(index, date!)} className="bg-white"/>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleDeleteComponent(component.id)} color="red">
                          <Trash2Icon />
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Flex justify='start' className="mt-4">
          <Card>
            <div className="font-bold mb-4">
              Total Overall Cost
            </div>
            <div className="text-lg">
              Rs. {totalOverallCost}
            </div>
          </Card>
        </Flex>
      </Card>
    </Box>
  );
};

export default ComponentsTable;
