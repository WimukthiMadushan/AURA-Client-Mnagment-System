'use client';
import { Box, Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes'
import React from 'react'
import CompanyStatusDropdown from './CompanyStatusDropdown'
import DatePicker from './DatePicker';
import StatusDropdown from '@/components/StatusDropdown';

interface controllerProps {
	controllername: string
	label: string
	description: string
	status: string
}
const Controller = ({controllername,label, description, status}: controllerProps) => {

	if (status == "engineer") {
		
		
	}
  return (
    <Dialog.Root>
		<Dialog.Trigger>
    		<Button variant='soft' color='blue'>{controllername}</Button>
		</Dialog.Trigger>
		<Dialog.Content maxWidth="450px">
			<Dialog.Title>{label}</Dialog.Title>
			<Dialog.Description size="2" mb="4">
				{description}
			</Dialog.Description>
			<Flex direction="column" gap="3">
				{status != 'component' && (
				<Box>
					<label>
						  <Text as="div" size="2" mb="1" weight="bold">Name</Text>
						  <TextField.Root placeholder="Enter your full name" />
					  </label>
					  <label>
							<Text as="div" size="2" mb="1" weight="bold">Email</Text>
							<TextField.Root placeholder="Enter your email" />
					  </label>
				</Box>
				)}
				{status == 'engineer' && <label>
					<CompanyStatusDropdown/>
				</label>}	
				{status == 'component' && (
					<Box>
						<label>
						  <Text as="div" size="2" mb="1" weight="bold">Component Name</Text>
						  <TextField.Root placeholder="Enter Component Name" />
					  	</label>
						<Flex  gapX={'3'}  mt={'3'}>
							<label className='flex-1'>
						  		<Text as="div" size="2" mb="1" weight="bold">Start Date</Text>
						  		<DatePicker />
					  		</label>
							<label className='flex-1'>
						  		<Text as="div" size="2" mb="1" weight="bold">End Date</Text>
						  		<DatePicker />
					  		</label>
						</Flex>		
					</Box>
				)}
			</Flex>

			<Flex gap="3" mt="4" justify="end">
				<Dialog.Close>
					<Button variant="soft" color="gray">
						Cancel
					</Button>
				</Dialog.Close>
				<Dialog.Close>
					<Button>Save</Button>
				</Dialog.Close>
			</Flex>
		</Dialog.Content>
	</Dialog.Root>
  )
}

export default Controller