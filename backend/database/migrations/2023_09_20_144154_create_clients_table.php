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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone'); 
            $table->string('delivery_address'); 
            $table->integer('delivery_zip_code'); 
            $table->string('delivery_city'); 
            $table->string('billing_address'); 
            $table->integer('billing_zip_code'); 
            $table->string('billing_city'); 
            $table->timestamps();
            $table->foreign('company_id')->references('id')->on('companies')->onUpdate('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
