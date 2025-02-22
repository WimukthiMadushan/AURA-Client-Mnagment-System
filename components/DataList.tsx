import { Badge, Link, DataList, Card } from '@radix-ui/themes';

const DataListComponent = () => {
    return (
      <Card className="cursor-pointer w-[20rem] gap-2 mb-2">
    <DataList.Root>
      <DataList.Item align="center">
        <DataList.Label minWidth="88px">Status</DataList.Label>
        <DataList.Value>
          <Badge color="jade" variant="soft" radius="full">
            Authorized
          </Badge>
        </DataList.Value>
      </DataList.Item>

      <DataList.Item>
        <DataList.Label minWidth="88px">Name</DataList.Label>
        <DataList.Value>Wimukthi Madushan</DataList.Value>
      </DataList.Item>

      <DataList.Item>
        <DataList.Label minWidth="88px">Email</DataList.Label>
        <DataList.Value>
          <Link href="mailto:vlad@workos.com">vlad@workos.com</Link>
        </DataList.Value>
      </DataList.Item>

      <DataList.Item>
        <DataList.Label minWidth="88px">Company</DataList.Label>
        <DataList.Value>
          <Link target="_blank" href="https://workos.com">
            AURA Digital Labs
          </Link>
        </DataList.Value>
      </DataList.Item>
            </DataList.Root>
        </Card>
  );
};

export default DataListComponent;
