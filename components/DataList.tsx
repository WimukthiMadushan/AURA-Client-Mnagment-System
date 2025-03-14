import { Badge, Link, DataList, Card } from '@radix-ui/themes';

interface ProjectManager {
  Email: string;
  Company: string;
  Name: string;
  Mobile: String;
}

interface Client {
  NIC: string;
  Email: string;
  Name: string;
}

interface DataListComponentProps {
  data: ProjectManager | Client;
  type: 'projectManager' | 'client';
}

const DataListComponent = ({ data, type }: DataListComponentProps) => {
  console.log("DataListComponent", data)
  return (
      <Card className="cursor-pointer w-[22rem] gap-2 mb-2">
        <DataList.Root>
          <DataList.Item>
            <DataList.Label minWidth="88px">Name</DataList.Label>
            <DataList.Value>{data.Name}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Email</DataList.Label>
              <DataList.Value>
                <Link href={`mailto:${data.Email}`}>{data.Email}</Link>
              </DataList.Value>
          </DataList.Item>

          {type === 'projectManager' ? (
          <>
            <DataList.Item>
              <DataList.Label minWidth="90px">Mobile</DataList.Label>
              <DataList.Value>
                <Link target="https://www.auradigitallabs.com/">{(data as ProjectManager).Mobile}</Link>
              </DataList.Value>
            </DataList.Item>

            <DataList.Item>
              <DataList.Label minWidth="88px">Company</DataList.Label>
              <DataList.Value>
                <Link target="https://www.auradigitallabs.com/">{(data as ProjectManager).Company}</Link>
              </DataList.Value>
            </DataList.Item>
          </>
        ) : (
          <DataList.Item>
            <DataList.Label minWidth="88px">NIC</DataList.Label>
            <DataList.Value>{(data as Client).NIC}</DataList.Value>
          </DataList.Item>
        )}
      </DataList.Root>
    </Card>
  );
};

export default DataListComponent;
