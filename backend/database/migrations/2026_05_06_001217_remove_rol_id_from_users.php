<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Migrate data before dropping
        $users = DB::table('users')->whereNotNull('rol_id')->get();
        foreach ($users as $user) {
            DB::table('role_user')->insert([
                'user_id' => $user->id,
                'rol_id' => $user->rol_id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'rol_id')) {
                // Drop the foreign key first if it exists
                // We use dropColumn as it's safer if the foreign key name isn't strictly predictable,
                // but usually it's table_column_foreign.
                $table->dropForeign(['rol_id']);
                $table->dropColumn('rol_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('rol_id')->nullable();
            $table->foreign('rol_id')->references('id')->on('roles')->nullOnDelete();
        });
    }
};
