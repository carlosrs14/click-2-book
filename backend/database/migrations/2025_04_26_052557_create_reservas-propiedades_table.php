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
        Schema::create('tipospropiedad', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });
        
        Schema::create('propiedades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('tipopropiedad_id')->constrained('tipospropiedad')->onDelete('cascade');
            $table->foreignId('barrio_id')->constrained('barrios')->onDelete('cascade');
            $table->string('direccion');
            $table->boolean('esambientefamiliar');
            $table->boolean('escupocompleto');
            $table->string('descripcion')->nullable();
            $table->timestamps();
        });

        Schema::create('cuartos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('propiedad_id')->constrained('propiedades')->onDelete('cascade');
            $table->float('valormensual', 2);
            $table->integer('capacidad');
            $table->boolean('tieneaire');
            $table->string('descripcion')->nullable();
            $table->timestamps();
        });

        Schema::create('tiposreserva', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });
        
        Schema::create('tiposestadoreserva', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pago_id')->nullable();
            $table->foreignId('tiporeserva_id')->constrained('tiposreserva')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('cuarto_id')->constrained('cuartos')->onDelete('cascade');
            $table->integer('cantidad_pensionados');
            $table->date('inicio');
            $table->date('fin');
            $table->timestamps();
        });

        Schema::create('estadosreserva', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reserva_id')->constrained()->onDelete('cascade');
            $table->foreignId('tipoestadoreserva_id')->constrained('tiposestadoreserva')->onDelete('cascade');
            $table->boolean('esactual');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estadosreserva');
        Schema::dropIfExists('reservas');
        Schema::dropIfExists('tiposestadoreserva');
        Schema::dropIfExists('tiposreserva');
        Schema::dropIfExists('propiedades');
        Schema::dropIfExists('cuartos');
        Schema::dropIfExists('tipospropiedad');
    }
};
