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
        Schema::create('wood', function (Blueprint $table) {
            $table->id();
            $table->double('unit_price', 10, 2);
            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wood');
    }
};
