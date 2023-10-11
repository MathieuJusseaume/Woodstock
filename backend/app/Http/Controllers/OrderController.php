<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Order;
use App\Models\DeliveryStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{

    public function index()
    {
        // Get the authenticated user.
        $authUser = Auth::user();
        // Retrieve orders for the user's company.
        $orders = Order::where('company_id', $authUser->company_id)->get();
        return response()->json([
            'order' => $orders,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // This method is empty, as it's not used for creating orders.
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Get the authenticated user.
        $authUser = Auth::user();
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
        ]);
        // Set default values for some fields.
        $validatedData['payment_status'] = false;
        $validatedData['user_id'] = $authUser->id;
        $validatedData['delivery_status_id'] = DeliveryStatus::getDeliveryStatusIdForName('A livrer');
        $validatedData['company_id'] = $authUser->company_id;
        // Create the order in the database.
        Order::create($validatedData);
        return response()->json(['message' => 'Store successfully'], 200);
    }


    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        // Retrieve the specified order by its ID.
        $order = Order::find($order);
        return response()->json([
            'order' => $order,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $id)
    {
        // Get the authenticated user.
        $authUser = Auth::user();
        // Retrieve the order by its ID and related data for editing.
        $order = Order::find($id);
        $clientsList = Client::where('company_id', $authUser->company_id)->get();
        $deliveryStatusList = DeliveryStatus::all();
        $usersList = User::where('company_id', $authUser->company_id)->get();
    
        return response()->json([
            'order' => $order,
            'clientsList' => $clientsList, 
            'deliveryStatusList' => $deliveryStatusList,
            'usersList' => $usersList,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
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
            if ($order) {
                // Update the order if it exists.
                $order->update($validatedData);
                return response()->json(['message' => 'Order updated successfully'], 200);
            } else {
                return response()->json(['message' => 'Order not found'], 404);
            }
        } catch (\Exception $e) {
            // Handle the exception here
            return response()->json(['error' => 'Failed updating order'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        try {
            if ($order) {
                // Delete the order if it exists.
                $order->delete(); 
                return response()->json(['message' => 'Delete successfully'], 200);
            } else {
                return response()->json(['message' => 'Order not found'], 404);
            }
        } catch (\Exception $e) {
            // Handle the exception here
            return response()->json(['error' => 'Failed deleting order'], 500);
        }
    }
}
