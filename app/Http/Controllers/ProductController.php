<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $products = Product::all(); // Fetch all products

        return response()->json($products, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,$id)
    {

        $validatedData = $request->validate([
            'product_name' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'description' => 'nullable|string',
            'specification' => 'nullable|string',
            'image' => 'nullable|image|max:2048', // Allow only image files up to 2MB
        ]);

        // // Handle Image Upload
        // $imagePath = null;
        // if ($request->hasFile('image')) {
        //     $imagePath = $request->file('image')->store('products', 'public');
        // }

        // // Create Product
        // $product = Product::create([
        //     'product_name'  => $request->input('product_name'),
        //     'brand'         => $request->input('brand'),
        //     'price'         => $request->input('price'),
        //     'quantity'      => $request->input('quantity'),
        //     'description'   => $request->input('description'),
        //     'specification' => $request->input('specification'),
        //     'image'         => $imagePath
        // ]);

        // return response()->json([
        //     'message' => 'Product added successfully!',
        //     'product' => $product
        // ], 201);



        try {
            $product = Product::findOrFail($id);
            $product->update($validatedData);

            return response()->json(['message' => 'Product updated successfully!']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }




    /**
     * Show the form for editing the specified resource.
     */


    /**
     * Update the specified resource in storage.
     */

     public function edit($id)
     {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
     }

        public function update(Request $request, $id)
        {
            $validator = \Validator::make($request->all(), [
                'product_name' => 'required|string|max:255',
                'brand' => 'nullable|string|max:255',
                'price' => 'required|numeric',
                'quantity' => 'required|integer',
                'description' => 'nullable|string',
                'specification' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $product = Product::findOrFail($id);

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('product_images', 'public');
                $product->image = $imagePath;
            }

            $product->update($request->except('image'));

            return response()->json(['message' => 'Product updated successfully!', 'product' => $product], 200);

        }
            /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
