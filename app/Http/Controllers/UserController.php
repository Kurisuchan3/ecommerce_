<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return response()->json(User::all(), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        dd("show");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Validate request data
        $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        // Update user data
        $user->update([
            'name' => $request->name,
            'status' => $request->status,
            'email' => $request->email,
        ]);

        // return response()->json(['message' => 'User updated successfully!', 'user' => $user], 200);
        return response()->json($user->refresh(), 200);

    }


    public function destroy(string $id)
    {
        User::destroy($id);
        return response()->json(['message' => 'User deleted']);
    }
}
