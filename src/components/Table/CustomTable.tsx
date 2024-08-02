"use client";
import { Box, Button, Chip, Modal, Typography } from "@mui/material";
import React, { useState } from "react";

// Import these components correctly depending on your structure
import { Product } from "@/types/global";
import Image from "next/image";
import ReviewButton from "../ReviewButton";
import { Columns } from "./TableHeader";
import TableUI from "./TableUI";
import { signOut } from "next-auth/react";
import loader from "@/app/public/assets/icons/loader.gif";

// Define the interface for the props of ProductTable component
interface ProductTableInterface {
  initialItems: Array<Product>; // Initial data items
  initialTotalCount: number; // Total count of items for pagination
}

// Modal style configuration
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "30px",
  p: 4,
};

const ListRow: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        id="modal-modal-description"
        sx={{ mt: 1, fontWeight: "600" }}
      >
        {title} :
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 1 }}>
        {value}
      </Typography>
    </Box>
  );
};

const ProductTable: React.FC<ProductTableInterface> = ({
  initialItems,
  initialTotalCount,
}) => {
  // State hooks
  const [items, setItems] = useState<Product[]>(initialItems); // State for items to display
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [loadingGif, setLoadingGif] = useState(true); // State to manage loading state
  const [totalPageCount, setTotalPageCount] = useState(
    Math.ceil(initialTotalCount / 4)
  ); // State for total number of pages
  const [dataDetail, setDataDetail] = useState<any>([]); // State to store data detail for modal

  // State for modal visibility
  const [open, setOpen] = React.useState(false);

  // Handler to open the modal and fetch data based on product ID
  const handleOpen = async (id: number) => {
  
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();

      if (data.id) {
        setOpen(true);
        setDataDetail(data);
        setLoadingGif(false);
      }
    } catch {
      setLoadingGif(false);
    }
  };

  // Handler to close the modal
  const handleClose = () => setOpen(false);

  // Define the number of items per page for pagination
  const ITEMS_PER_PAGE = 4;

  // Handler for page change in pagination
  const handlePageChange = async (page: any) => {
    setLoading(true);
    const response = await fetch(
      `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${
        (page - 1) * ITEMS_PER_PAGE
      }`
    );
    const data = await response.json();
    setItems(data.products);
    setLoading(false);
  };

  // Handler for search functionality
  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      // Restore the original data when the search query is empty
      setItems(initialItems);
    } else {
      const filteredData = items.filter(
        (item: Product) =>
          item?.title?.toLowerCase().includes(query.toLowerCase()) ||
          item?.description?.toLowerCase().includes(query.toLowerCase())
      );
      setItems(filteredData || []);
    }
  };

  return (
    <section className="mt-5">
      <h3 className="text-[18px] mb-2 md:text-[24px] text-black"></h3>
      <Box>
        <Button
          variant="outlined"
          sx={{ my: "12px" }}
          onClick={() => signOut()}
        >
          Sign out
        </Button>
        <TableUI
          data={items}
          columns={[
            ...Columns,
            {
              accessorKey: "ViewReviews",
              header: "View Reviews",
              cell: (user: any) => {
                return (
                  <ReviewButton
                    onClick={() => {
                      handleOpen(user.row.original.id);
                    }}
                  />
                );
              },
            },
          ]}
          searchLabel="Search"
          EmptyText="No product found!"
          isFetching={loading}
          pageCount={totalPageCount}
          page={handlePageChange}
          search={handleSearch}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loadingGif ? (
          <Box sx={style}>
            <Image width={120} height={120} src={loader} alt="Loading gif" />
          </Box>
        ) : (
          <Box sx={style}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={dataDetail?.thumbnail}
                width={180}
                height={180}
                alt={""}
              />
            </Box>
            <Typography id="modal-modal-title" variant="h4" component="h4">
              {dataDetail?.title}
            </Typography>

            <ListRow title={"Brand"} value={dataDetail?.brand} />
            <ListRow title={"Category"} value={dataDetail?.category} />
            <ListRow title={"Price"} value={dataDetail?.price} />
            <ListRow
              title={"Warranty Information"}
              value={dataDetail?.warrantyInformation}
            />
            <ListRow title={"Return Policy"} value={dataDetail?.returnPolicy} />

            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontWeight: "600" }}
            >
              About
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
              {dataDetail?.description}
            </Typography>

            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontWeight: "600" }}
            >
              Tag
            </Typography>
            <Box sx={{ flexDirection: "row" }}>
              {dataDetail?.tags?.map((item: string, index: number) => (
                <Chip
                  label={item}
                  variant="outlined"
                  color={index % 2 == 0 ? "primary" : "success"}
                  sx={{ mx: 1, mt: 2 }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Modal>
    </section>
  );
};

export default ProductTable;
