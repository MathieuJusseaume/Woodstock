<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Order;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index()
    {
        $authUser = Auth::user();
        try {
            $comments = Comment::whereHas('order', function ($query) use ($authUser) {
                $query->where('company_id', $authUser->company_id);
            })->get();
            return response()->json(['message' => 'Clients recovered successfully', 'comments' => $comments], 200);
        } catch (Error $error) {
            return response()->json(['error' => 'failed to get comment']);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $authUser = Auth::user();

        try {
            $validatedData = $request->validate([
                'content' => 'required|string',
                'order_id' => 'required|numeric'
               ,
            ]);

            $order = Order::find($validatedData['order_id']);

        if ($order->company_id == $authUser->company_id){
            $comment = Comment::create($validatedData);
            return response()->json(['message' => 'Client created successfully', 'comment' => $comment, "test" =>$order->company_id, 'test2' => $authUser->company_id],  200);
        }else{
            return response()->json(['error' => 'Forbidden'], 403);
        };

        } catch (Error $error) {
            return response()->json(['error' => 'failed to store comment']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        $authUser = Auth::user();
        try {
            $comment = Comment::find($comment->id);
            return $comment->order->company_id == $authUser->company_id
                ? response()->json(['comment' => $comment], 200)
                : response()->json(['error' => 'Forbidden'], 403);
        } catch (Error $e) {
            return response()->json(['error' => 'failed show comment']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $authUser = Auth::user();
        $comment = Comment::find($id);

        try {
            $validatedData = $request->validate([
                'content' => 'required|string',
                'order_id' => 'required|numeric'
               ,
            ]);

            if ($comment->order_id->company_id == $authUser->company_id) {
                // Update the comment
                $comment->update($validatedData);
                // Respond with a JSON message indicating a successful deletion
                return response()->json(['message' => 'Comment updated successfully', 'comment' => $comment], 200);
            } else {
                // Respond with a JSON error message indicating that access is forbidden
                return response()->json(['error' => 'Forbidden'], 403);
            }
        } catch (Error $e) {
            return response()->json(['error' => 'failed updating comment']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $authUser = Auth::user();

        try {
            // Check if the company ID of the comment to be deleted matches the company ID of the authenticated user
            if ($comment->order_id->company_id == $authUser->company_id) {
                // Delete the comment if it exists
                $comment->delete();
                // Respond with a JSON message indicating a successful deletion
                return response()->json(['message' => 'Delete successfully'], 200);
            } else {
                // Respond with a JSON error message indicating that access is forbidden
                return response()->json(['error' => 'Forbidden'], 403);
            }
        } catch (Error $e) {
            // Handle any exceptions that might occur during the deletion process
            return response()->json(['error' => 'Failed deleting comment']);
        }
    }
}