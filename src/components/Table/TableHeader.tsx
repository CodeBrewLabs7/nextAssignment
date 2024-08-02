import { Chip } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";


// number of column can be defined here and wi
export const Columns: ColumnDef<any, any>[] = [

  {
    accessorKey: "Id",
    header: "Id",
    cell: (user: any) => {
      
      
     return <span>{user.row.original.id}</span>
    },
  },

  {
    accessorKey: "Title",
    header: "Title",
    cell: (user: any) => {
     return <span>{user.row.original.title}</span>
    },
  },

  {
    accessorKey: "Description",
    header: "Description",
    cell: (user: any) => {
     return <span>{user.row.original.description.slice(0,20)}...</span>
    },
  },
  {
    accessorKey: "Category",
    header: "Category",
    cell: (user: any) => {
     return <span>{user.row.original.category}</span>
    },
  },
  {
    accessorKey: "Price",
    header: "Price",
    cell: (user: any) => {
     return <span>{user.row.original.price}</span>
    },
  },
  {
    accessorKey: "DiscountPercentage",
    header: "Discount Percentage",
    cell: (user: any) => {
     return <span>{user.row.original.discountPercentage}</span>
    },
  },
  {
    accessorKey: "Rating",
    header: "Rating",
    cell: (user: any) => {
     return <span>{user.row.original.rating}</span>
    },
  },
  {
    accessorKey: "Stock",
    header: "Stock",
    cell: (user: any) => {
     return <span>{user.row.original.stock}</span>
    },
  },
  {
    accessorKey: "Tag",
    header: "Tag",
    cell: (user: any) => {
      return <span style={{gap:2}}>{user.row.original.tags.map((item:any)=><Chip label={item} variant="outlined" color="error"/>)}</span>
    },
  },
  {
    accessorKey: "Brands",
    header: "Brands",
    cell: (user: any) => {
     return <span>{user.row.original.brand}</span>
    },
  },
  

// You can follow the structure to display other data such as country and status


]
