import {
    Box,
    Paper,
    Skeleton,
    Table as MuiTable,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
   
Pagination, styled, 

  } from "@mui/material";
  import {
    Cell,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    Row,
    useReactTable,
  } from "@tanstack/react-table";
  import { debounce } from "lodash";
  import { ChangeEvent, FC, memo, ReactElement, useMemo, useState } from "react";

// Styles with styled-component

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f1f1f1;
  }
  &:last-child td,
  &:last-child th {
    border: 0;
  }
  :hover {
    background-color: #d9d9d9;
  }
`;

export const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
 `;


    // Typescript interface

  interface TableProps {
    data: any[];
    columns: ColumnDef<any>[];
    isFetching?: boolean;
    skeletonCount?: number;
    skeletonHeight?: number;
    headerComponent?: JSX.Element;
    pageCount?: number;
    page?: (page: number) => void;
    search?: (search: string) => void;
    onClickRow?: (cell: Cell<any, unknown>, row: Row<any>) => void;
    searchLabel?: string;
    EmptyText?: string;
    children?: React.ReactNode | React.ReactElement
    handleRow?: () => void
    handleOpen?:()=>void;

  }


// The main table 

  const TableUI: FC<TableProps> = ({
    data,
    columns,
    isFetching,
    skeletonCount = 10,
    skeletonHeight = 28,
    headerComponent,
    pageCount,
    search,
    onClickRow,
    page,
    searchLabel = "Search",
    EmptyText,
    children, 
    handleRow,
    handleOpen

  }) => {
    const [paginationPage, setPaginationPage] = useState(1);

    const memoizedData = useMemo(() => data, [data]);
    const memoizedColumns = useMemo(() => columns, [columns]);
    const memoisedHeaderComponent = useMemo(
      () => headerComponent,
      [headerComponent]
    );
        // tanstack table hooks
    const { getHeaderGroups, getRowModel, getAllColumns } = useReactTable({
      data: memoizedData,
      columns: memoizedColumns,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      pageCount,
    });

    const skeletons = Array.from({ length: skeletonCount }, (x, i) => i);

    const columnCount = getAllColumns().length;

    const noDataFound =
      !isFetching && (!memoizedData || memoizedData.length === 0);

      // handling the search function 
    const handleSearchChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      search && search(e.target.value);
    };

    // handling the pagingation 
    const handlePageChange = (
      event: ChangeEvent<unknown>,
      currentPage: number
    ) => {
      setPaginationPage(currentPage === 0 ? 1 : currentPage);
      page?.(currentPage === 0 ? 1 : currentPage);
    };
    

    // returing the paper componenet from the react table.
    return (
      <Paper elevation={2} style={{ padding: "0 0 1rem 0" }}>
        <Box paddingX="1rem">
          {memoisedHeaderComponent && <Box>{memoisedHeaderComponent}</Box>}
          {search && (
            <TextField
              onChange={debounce(handleSearchChange, 1000)}
              size="small"
              label={searchLabel}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          )}
        </Box>
        <Box style={{ overflowX: "auto" }}>
          <MuiTable>
            {!isFetching && (
              <TableHead>
                {getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="bg-[#fff]">
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id} className="text-[#000] text-sm font-bold" >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableCell>


                    ))}
                  </TableRow>
                ))}
              </TableHead>
            )}
            <TableBody>
              {!isFetching ? (
                getRowModel()?.rows.map((row) => (
                  <StyledTableRow key={row.id} onClick={handleRow}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        onClick={() => onClickRow?.(cell, row)}
                        key={cell.id}
                        className="text-[#2E353A] text-base font-graphik border-1 border-black-700 border-solid py-[12px]"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>

                    ))}





                  </StyledTableRow>




                )


                )
              ) : (
                <>
                  {skeletons.map((skeleton) => (
                    <TableRow key={skeleton}>
                      {Array.from({ length: columnCount }, (x, i) => i).map(
                        (elm) => (
                          <TableCell key={elm}>
                            <Skeleton height={skeletonHeight} />
                          </TableCell>


                        )
                      )}
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </MuiTable>
        </Box>
        {noDataFound && (
          <Box my={2} textAlign="center">
            {EmptyText}
          </Box>
        )}
        {pageCount && page && (
         <StyledPagination
         count={pageCount}
         page={paginationPage}
         onChange={handlePageChange}
         color="primary"
         showFirstButton 
         showLastButton
       />
        )}
      </Paper>
    );
  };

 
  export default memo(TableUI);