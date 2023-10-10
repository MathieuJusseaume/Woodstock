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

            $table->foreignId('user_id')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreignId('client_id')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreignId('delivery_status_id')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreignId('company_id')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropColumn('company_id');
            $table->dropForeign(['delivery_status_id']);
            $table->dropColumn('delivery_status_id');
            $table->dropForeign(['client_id']);
            $table->dropColumn('client_id');
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');

        });
    }
};
