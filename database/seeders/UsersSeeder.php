<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'username' => 'Odiseo',
            "photo"=>"https://upload.wikimedia.org/wikipedia/commons/b/bc/Socrate_du_Louvre.jpg",
            'email' => 'user1@example.com',
            'password' => Hash::make('123456'),
        ]);

        User::create([
            'username' => 'Javier',
            "photo"=>"https://mitologiaclasica.com/wp-content/uploads/2024/03/Aquiles.webp",
            'email' => 'user2@example.com',
            'password' => Hash::make('123456'),
        ]);
        
        //User::factory(10)->create(); // Usa la fábrica para crear usuarios adicionales
    }
}
