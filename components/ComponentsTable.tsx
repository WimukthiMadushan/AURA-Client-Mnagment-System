'use client';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { AlertDialog, Badge, Button, Callout, Card, Container, Flex } from "@radix-ui/themes";
import { Pencil, Trash2, Trash2Icon } from "lucide-react";
import React, { useState } from 'react';
import { format } from "date-fns";
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const ComponentsTable = () => {
  const [components, setComponents] = useState([
    {
      name: "ESP32 Microcontroller",
      startDate: "2023-01-10",
      endDate: "2023-02-10",
      returnedDate: "",
      penalty: 5,
    },
    {
      name: "Raspberry Pi 4 Model B",
      startDate: "2023-03-15",
      endDate: "2026-04-15",
      returnedDate: "",
      penalty: 10,
    },
    {
      name: "Arduino Uno",
      startDate: "2023-02-01",
      endDate: "2026-03-01",
      returnedDate: "",
      penalty: 3,
    },
    {
      name: "Lithium-ion Battery",
      startDate: "2023-04-01",
      endDate: "2023-05-01",
      returnedDate: "",
      penalty: 7,
    },
    {
      name: "Bluetooth Module HC-05",
      startDate: "2023-02-10",
      endDate: "2026-03-10",
      returnedDate: "",
      penalty: 2,
    },
    {
      name: "OLED Display 0.96\"",
      startDate: "2023-03-25",
      endDate: "2023-04-25",
      returnedDate: "",
      penalty: 4,
    },
    {
      name: "Raspberry Pi Zero W",
      startDate: "2023-05-05",
      endDate: "2024-06-05",
      returnedDate: "",
      penalty: 6,
    },
    {
      name: "Servo Motor SG90",
      startDate: "2023-06-01",
      endDate: "2023-07-01",
      returnedDate: "",
      penalty: 3,
    },
    {
      name: "Raspberry Pi Camera Module",
      startDate: "2023-07-10",
      endDate: "2023-08-10",
      returnedDate: "",
      penalty: 8,
    },
    {
      name: "ESP8266 WiFi Module",
      startDate: "2023-05-15",
      endDate: "2023-06-15",
      returnedDate: "",
      penalty: 3,
    },
  ]);

  const totalPenalty = components.reduce((sum, component) => sum + component.penalty, 0);

  const getStatus = (endDate: string) => {
    const currentDate = new Date();
    const endDateObj = new Date(endDate);
    return endDateObj >= currentDate ? "Have Time" : "Overdue";
  };

  const handleReturnedDateChange = (index: number, date: Date) => {
    setComponents((prevComponents) => {
      const newComponents = [...prevComponents];
      const returnedDate = format(date, "yyyy-MM-dd");
      newComponents[index].returnedDate = returnedDate;

      // If returned date is before or equal to end date, reset penalty
      const isReturnedOnTime =
        new Date(newComponents[index].returnedDate) <= new Date(newComponents[index].endDate);
      newComponents[index].penalty = isReturnedOnTime ? 0 : newComponents[index].penalty;

      return newComponents;
    });
  };

  return (
    <Container>
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          You will need admin privileges to install and access this application.
        </Callout.Text>
      </Callout.Root>

      <Card my="4">
        <Table>
          <TableCaption>A list of your Renting Components.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Component Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Penalty</TableHead>
              <TableHead>Returned Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {components.map((component, index) => (
              <TableRow key={index}>
                <TableCell>{component.name}</TableCell>
                <TableCell>{component.startDate}</TableCell>
                <TableCell>{component.endDate}</TableCell>
                <TableCell>
                  <Badge color={getStatus(component.endDate) === "Have Time" ? "green" : "red"}>
                    {getStatus(component.endDate)}
                  </Badge>
                </TableCell>
                <TableCell>${component.penalty}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="2" className="w-[70%]">
                        {component.returnedDate ? format(new Date(component.returnedDate), "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className={cn(
                        "w-auto p-0 mt-2 rounded-lg shadow-lg",
                        "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600",
                        )}
                        align="start"
                        >
                      <Calendar
                        mode="single"
                        selected={component.returnedDate ? new Date(component.returnedDate) : undefined}
                        onSelect={(date) => handleReturnedDateChange(index, date!)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  <AlertDialog.Root>
                    <AlertDialog.Trigger>
                      <Button
                        size="2"
                        variant="soft"
                        color="red"
                        className="rounded-full hover:bg-red-200"
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
                            //onClick={() => deleteProject(project.id)}
                          >
                            Delete
                          </Button>
                        </AlertDialog.Action>
                      </Flex>
                    </AlertDialog.Content>
                  </AlertDialog.Root>
                </TableCell>
              </TableRow>
            ))}
            <TableRow style={{ fontWeight: 'bold' }}>
              <TableCell>Total Penalty</TableCell>
              <TableCell colSpan={3} className="text-right">${totalPenalty}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};

export default ComponentsTable;
