<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subreddit;

class SubredditsSeeder extends Seeder
{
    public function run()
    {
        Subreddit::create([
            'name' => 'Laravel',
            'description' => 'For Laravel enthusiasts',
            'photo' => "https://static-00.iconduck.com/assets.00/laravel-icon-497x512-uwybstke.png",
            'user_id' => 1,
        ]);

        Subreddit::create([
            'name' => 'ReactJS',
            'description' => 'A community for React developers',
            'photo' => "https://cdn.vectorstock.com/i/1000v/78/57/react-icon-in-a-hexagon-vector-36587857.jpg",
            'user_id' => 2,
        ]);
    }
}
