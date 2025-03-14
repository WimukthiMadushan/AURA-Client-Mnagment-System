import { Link, DataList, Card } from '@radix-ui/themes';

interface ProjectManager {
  Email: string;
  Company: string;
  Name: string;
  Mobile: string;
}

interface Client {
  NIC: string;
  Email: string;
  Name: string;
}

interface DataListComponentProps {
  data: ProjectManager | Client | ProjectManager[]; // Allow data to be an array of ProjectManager
  type: 'projectManager' | 'client';
}

const DataListComponent = ({ data, type }: DataListComponentProps) => {
  // If the type is 'projectManager' and data is an array, extract the first element
  const projectManagerData = type === 'projectManager' && Array.isArray(data) ? data[0] : data;

  console.log("DataListComponent", type, data);

  return (
    <Card className="cursor-pointer w-[22rem] gap-2 mb-2">
      <DataList.Root>
        <DataList.Item>
          <DataList.Label minWidth="88px">Name</DataList.Label>
          <DataList.Value>{!Array.isArray(projectManagerData) && projectManagerData.Name}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Email</DataList.Label>
          <DataList.Value>
            {!Array.isArray(projectManagerData) && (
              <Link href={`mailto:${projectManagerData.Email}`}>{projectManagerData.Email}</Link>
            )}
          </DataList.Value>
        </DataList.Item>

        {type === 'projectManager' ? (
          <>
            <DataList.Item>
              <DataList.Label minWidth="90px">Mobile</DataList.Label>
              <DataList.Value>
                <Link target="https://www.auradigitallabs.com/">{(projectManagerData as ProjectManager).Mobile}</Link>
              </DataList.Value>
            </DataList.Item>

            <DataList.Item>
              <DataList.Label minWidth="88px">Company</DataList.Label>
              <DataList.Value>
                <Link target="https://www.auradigitallabs.com/">{(projectManagerData as ProjectManager).Company}</Link>
              </DataList.Value>
            </DataList.Item>
          </>
        ) : (
          <DataList.Item>
            <DataList.Label minWidth="88px">NIC</DataList.Label>
            <DataList.Value>{(projectManagerData as Client).NIC}</DataList.Value>
          </DataList.Item>
        )}
      </DataList.Root>
    </Card>
  );
};

export default DataListComponent;
