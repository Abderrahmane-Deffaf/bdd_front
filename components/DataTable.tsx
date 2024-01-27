"use client"

import { useMemo } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/* will contain our <DataTable /> component */
// this could be a reusable component

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount: number
  setPage: any
  pageIndex: number
  pageSize: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  setPage,
  pageIndex,
  pageSize,
}: DataTableProps<TData, TValue>) {
  /* const [{  pageSize }, setPagination] = useState<PaginationState>({
    pageSize: pageSizeNumber,
  }); */

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    //getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    state: {
      pagination,
    },
    pageCount: pageCount,
    onPaginationChange: () => {
      //setPagination(value);

      if (table.getCanNextPage()) {
        setPage(pageIndex + 1)
      } else if (table.getCanPreviousPage()) {
        setPage(pageIndex - 1)
      }
    },
  })

  return (
    <div>
      <div className="rounded-md border text-xl  ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className=" text-xl" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="text-xl"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          size="sm"
          onClick={() => {
            //table.previousPage();
            setPage(pageIndex - 1)
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Précédente
        </Button>
        <p className=" text-sm text-blue">
          Page {pageIndex + 1} sur {table.getPageCount()}
        </p>
        <Button
          size="sm"
          onClick={() => {
            //table.nextPage();

            setPage(pageIndex + 1)
          }}
          disabled={!table.getCanNextPage()}
        >
          Prochaine
        </Button>
      </div>
    </div>
  )
}

/* import { useMemo } from "react"
import Link from "next/link"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  totalPages: number
  pageIndex: number
  pageSize: number
  route: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalPages,
  pageIndex,
  pageSize,
  route, 
}: DataTableProps<TData, TValue>) {
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: totalPages,
    state: {
      pagination,
    },
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-md  border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center gap-5">
        {table.getCanPreviousPage() && (
          <Link href={`/${route}?page=${pageIndex - 1}`}>Previous</Link>
        )}
        {table.getCanNextPage() && (
          <Link href={`/${route}?page=${pageIndex + 1}`}>Next</Link>
        )}
      </div>
    </div>
  )
}
 */
