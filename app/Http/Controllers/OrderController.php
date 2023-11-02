<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Order;
use App\Models\DeliveryStatus;
use App\Models\User;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{

    public function index()
    {
        // Get the authenticated user.
        $authUser = Auth::user();
        try {
            // Retrieve orders for the user's company.
            $orders = Order::with(['deliveryStatus', 'client', 'comments', 'user'])
                ->where('company_id', $authUser->company_id)
                ->get();
            return response()->json(['message' => 'Orders recorvery successfully', 'order' => $orders], 200);
        } catch (Error $error) {
            return response()->json(['error' => 'failed to get orders']);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Get the authenticated user.
        $authUser = Auth::user();

        try {
            // Validate the incoming order data.
            $validatedData = $request->validate([
                'order_number' => 'required|numeric',
                'order_date' => 'required|date',
                'delivery_date' => 'required|date',
                'quantity' => 'required|numeric',
                'log_size' => 'required|numeric',
                'order_price' => 'required|numeric',
                'delivery_price' => 'required|numeric',
                'client_id' => 'required|numeric',
                'user_id' => 'required|numeric'
            ]);
            // Set default values for some fields.
            $validatedData['payment_status'] = false;
            $validatedData['delivery_status_id'] = DeliveryStatus::getDeliveryStatusIdForName('A livrer');
            $validatedData['company_id'] = $authUser->company_id;
            // Create the order in the database.
            $store = Order::create($validatedData);
            return response()->json(['message' => 'Store created successfully', 'store' => $store], 200);
        } catch (Error $error) {
            return response()->json(['error' => 'failed to store order']);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Retrieve the specified order by its ID.
        $authUser = Auth::user();
        $order = Order::with(['deliveryStatus', 'client', 'comments', 'user'])->find($id);
        try {

            return $order->company_id == $authUser->company_id
                ? response()->json(['order' => $order])
                : response()->json(['error' => 'Forbidden'], 403);
        } catch (Error $e) {
            return response()->json(['error' => 'failed show order'], 401);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {

        $authUser = Auth::user();
        try {
            // Validate the incoming order data.
            $validatedData = $request->validate([
                'order_number' => 'numeric',
                'order_date' => 'date',
                'delivery_date' => 'date',
                'quantity' => 'numeric',
                'log_size' => 'numeric',
                'order_price' => 'numeric',
                'delivery_price' => 'numeric',
                'client_id' => 'numeric',
                'payment_status' => 'boolean',
                'user_id' => 'numeric',
                'delivery_status_id' => 'numeric',
            ]);

            if ($order->company_id == $authUser->company_id) {
                // Update the user
                $order->update($validatedData);
                // Respond with a JSON message indicating a successful deletion
                return response()->json(['message' => 'Order updated successfully', 'order' => $order], 200);
            } else {
                // Respond with a JSON error message indicating that access is forbidden
                return response()->json(['error' => 'Forbidden', 'order' => $order], 403);
            }
        } catch (Error $e) {
            // Handle the exception here
            return response()->json(['error' => 'Failed updating order']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {

        $authUser = Auth::user();
        try {
            // Check if the company ID of the user to be deleted matches the company ID of the authenticated user
            if ($order->company_id == $authUser->company_id) {
                // Delete the user if it exists
                $order->delete();
                // Respond with a JSON message indicating a successful deletion
                return response()->json(['message' => 'Delete successfully'], 200);
            } else {
                // Respond with a JSON error message indicating that access is forbidden
                return response()->json(['error' => 'Forbidden'], 403);
            }
        } catch (Error $e) {
            // Handle any exceptions that might occur during the deletion process
            return response()->json(['error' => 'Failed deleting order']);
        }
    }
}
