import { Skeleton } from "@radix-ui/themes";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ComponentsTableSkeleton = () => {
  return (
    <Table>
      <TableCaption>A list of your Renting Components.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead><Skeleton width="150px" height="20px" /></TableHead>
          <TableHead><Skeleton width="100px" height="20px" /></TableHead>
          <TableHead><Skeleton width="100px" height="20px" /></TableHead>
          <TableHead><Skeleton width="80px" height="20px" /></TableHead>
          <TableHead><Skeleton width="80px" height="20px" /></TableHead>
          <TableHead><Skeleton width="120px" height="20px" /></TableHead>
          <TableHead><Skeleton width="50px" height="20px" /></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell><Skeleton width="150px" height="20px" /></TableCell>
            <TableCell><Skeleton width="100px" height="20px" /></TableCell>
            <TableCell><Skeleton width="100px" height="20px" /></TableCell>
            <TableCell><Skeleton width="80px" height="20px" /></TableCell>
            <TableCell><Skeleton width="80px" height="20px" /></TableCell>
            <TableCell><Skeleton width="120px" height="20px" /></TableCell>
            <TableCell><Skeleton width="50px" height="20px" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ComponentsTableSkeleton;
