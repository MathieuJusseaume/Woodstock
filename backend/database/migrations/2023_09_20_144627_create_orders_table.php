<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer('order_number');
            $table->date('order_date');
            $table->date('delivery_date');
            $table->integer('quantity');
            $table->integer('log_size');
            $table->double('order_price', 10, 2);
            $table->double('delivery_price', 8, 2);
            $table->boolean('payment_status')->default(0);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade');
            $table->foreign('client_id')->references('id')->on('clients')->onUpdate('cascade');
            $table->foreign('delivery_status_id')->references('id')->on('delivery_statuses')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
