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
        Schema::create('tiposestadodenuncia', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('denuncias', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion');
            $table->foreignId('user_denunciador_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('user_denunciado_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('estadosdenuncia', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tipoestadodenuncia_id')->constrained('tiposestadodenuncia')->onDelete('cascade');
            $table->foreignId('denuncia_id')->constrained('denuncias')->onDelete('cascade');
            $table->boolean('esactual');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estadosdenuncia');
        Schema::dropIfExists('denuncias');
        Schema::dropIfExists('tiposestadodenuncia');
    }
};
