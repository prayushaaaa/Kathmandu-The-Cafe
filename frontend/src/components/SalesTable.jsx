import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LucideEdit, LucideTrash } from "lucide-react";
import { deleteSale, getSales } from "@/api";
import { Input } from "@/components/ui/input";

const SalesTable = () => {
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  // Define Table Columns
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      size: 100,
    },
    {
      accessorKey: "customer_name",
      header: "Customer",
      size: 100,
    },
    {
      accessorKey: "items",
      header: "Items",
      size: "auto",
      cell: ({ row }) => {
        const items = row.original.items.map((item, index) => (
          <p key={index}>
            {item.item_name} ({item.quantity})
          </p>
        ));
        return <div>{items}</div>;
      },
      filterFn: (row, columnId, filterValue) => {
        const itemsText = row.original.items
          .map((item) => item.item_name.toLowerCase())
          .join(", "); // Convert array to string
        return itemsText.includes(filterValue.toLowerCase());
      },
    },
    {
      accessorKey: "total_price",
      header: "Total (Rs.)",
      size: 200,
    },
    {
      accessorKey: "sale_date",
      header: "Sales Date",
      size: 200,
      cell: ({ row }) => {
        const [date, time] = new Date(row.original.sale_date)
          .toLocaleString()
          .split(", ");
        const [hours, minutes, seconds] = time.split(":");
        return (
          <span>
            {date}
            <br />
            {hours}:{minutes} {seconds.split(" ")[1]}
          </span>
        );
      },
    },
    {
      accessorKey: "payment_method",
      header: "Payment",
      size: 200,
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <LucideEdit />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
          >
            <LucideTrash />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const sales = await getSales();
        setData(sales);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
    fetchSalesData();
  }, []);

  const handleDelete = async (saleId) => {
    try {
      const result = await deleteSale(saleId); // Call the deleteSale API
      alert(result.message); // Show success message
      setData(data.filter((sale) => sale.id !== saleId)); // Remove the deleted sale from the state
    } catch (error) {
      alert("Error deleting sale");
    }
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          type="text"
          placeholder="Filter Items..."
          value={table.getColumn("items")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("items")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mr-1"
        />
        <Input
          type="date"
          placeholder="Filter date..."
          value={table.getColumn("sale_date")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("sale_date")?.setFilterValue(event.target.value)
          }
          className="max-w-sm ml-1"
        />
      </div>
      <div className="overflow-x-auto w-full">
        <Table className="min-w-full border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-left">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4"
                >
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
};

export default SalesTable;
