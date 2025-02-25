import { Badge, Link, DataList, Card } from '@radix-ui/themes';

interface Engineer {
  EmploymentStatus: string;
  Email: string;
  Company: string;
  Name: string;
}

interface Client {
  NIC: string;
  Email: string;
  Name: string;
}

interface DataListComponentProps {
  data: Engineer | Client;
  type: 'engineer' | 'client';
}

const DataListComponent = ({ data, type }: DataListComponentProps) => {
  return (
      
      <Card className="cursor-pointer w-[20rem] gap-2 mb-2">
        <DataList.Root>
          <DataList.Item>
            <DataList.Label minWidth="88px">Name</DataList.Label>
            <DataList.Value>{ data.Name}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Email</DataList.Label>
              <DataList.Value>
                <Link href={`mailto:${data.Email}`}>{data.Email}</Link>
              </DataList.Value>
          </DataList.Item>

          {type === 'engineer' ? (
          <>
            <DataList.Item>
              <DataList.Label minWidth="88px">Status</DataList.Label>
              <DataList.Value>
                <Badge color="jade" variant="soft" radius="full">
                  {(data as Engineer).EmploymentStatus}
                </Badge>
              </DataList.Value>
            </DataList.Item>

            <DataList.Item>
              <DataList.Label minWidth="88px">Company</DataList.Label>
              <DataList.Value>
                <Link target="_blank">{(data as Engineer).Company}</Link>
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
