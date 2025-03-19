<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function store(Request $request)
{
    // Ensure Laravel recognizes the token authentication
    $user = Auth::guard('sanctum')->user();

    if (!$user) {
        return response()->json(["message" => "Unauthenticated."], 401);
    }

    // Store cart item
    $cart = new Cart();
    $cart->user_id = $user->id;
    $cart->product_id = $request->product_id;
    $cart->quantity = $request->quantity;
    $cart->save();

    return response()->json(["message" => "Added to cart!", "cart" => $cart], 201);
}
    // public function index($id)
    // {
    //     $user = User::find($id);
    //     dd($user);
    //     if (!$user) {
    //         return response()->json(['message' => 'User not found'], 404);
    //     }

    //     $get_user_id = $user->id;
    //     $products = Cart::where('user_id', $get_user_id)->get();

    //     if ($products->isEmpty()) {
    //         return response()->json(['message' => 'No products in the cart'], 404);
    //     }

    //     return response()->json($products, 200);
    // }
}
