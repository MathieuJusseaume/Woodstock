<?php

namespace App\Http\Controllers;

use App\Models\DeliveryStatus;
use Illuminate\Http\Request;

class DeliveryStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $deliveryStatus = DeliveryStatus::get();
        try {
            return response()->json(['deliveryStatus' => $deliveryStatus]);
        } catch (Error $e) {
            return response()->json(['error' => 'failed show order'], 401);
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
     * Show the form for editing the specified resource.
     */
    public function edit(DeliveryStatus $deliveryStatus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DeliveryStatus $deliveryStatus)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeliveryStatus $deliveryStatus)
    {
        //
    }
}
