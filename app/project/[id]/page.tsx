import ComponentsTable from '@/components/ComponentsTable'
import DataListComponent from '@/components/DataList'
import { Box, Button, Container, Flex, Text } from '@radix-ui/themes'
import Controller from './../_components/Controller'

const projectDetailsPage = () => {
  return (
    <Container>
      <Text as="div" size="6" weight="bold" className='mb-4'>
         Project 01
      </Text>
      <Flex className='mb-4'>
        <Box className="w-[30rem]">
          <Text as="div" size="4" weight="bold" className='mb-4'>
            Assign Engineers
          </Text>
          <DataListComponent />
          <DataListComponent />
          <DataListComponent />
        </Box>
        <Box className="w-[30rem]">
          <Text as="div" size="4" weight="bold" className='mb-4'>
            Clients
          </Text>
          <DataListComponent />
          <DataListComponent />
        </Box>
        <Box className="w-[15rem]">
          <Text as="div" size="4" weight="bold" className='mb-4'>
            Controllers 
          </Text>
          <Flex direction={'column'} gapY={'2'}>
            <Controller status='engineer' controllername="Add Engineers" label='Add a New Engineer' description='Here You can Add Engineers'/>
            <Controller status='client' controllername="Add Clients" label='Add a New Client' description='Here You can Add Clients'/>
            <Controller status ='component' controllername="Add Component" label='Add a New Component' description='Here You can Add Components'/>
          </Flex>  
        </Box>
        
      </Flex>
      <ComponentsTable/>
    </Container>
  )
}

export default projectDetailsPage