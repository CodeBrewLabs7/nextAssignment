import { Product } from "@/types/global"; // Import the Product type from the global types
import type { NextApiRequest, NextApiResponse } from "next"; // Import NextApiRequest and NextApiResponse types from Next.js
import {NextResponse} from 'next/server'
// API route handler
export default async function GET(
  req: NextApiRequest, // Type for the request object
  res: NextApiResponse<Product[] | { error: string }> // Type for the response object, which can return either an array of products or an error message
) {
  // Check if the request method is GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' }); // Return 405 status if the method is not allowed
  }

  try {
    // Fetch data from the dummy JSON API
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json(); // Parse the JSON data
    // res.status(200).json(data.products); // Return the products data with a 200 status
    return NextResponse.json(data)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" }); // Return an error message with a 500 status if fetching data fails
  }
}
