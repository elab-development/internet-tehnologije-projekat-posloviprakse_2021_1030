<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        (new CompanySeeder())->run();

        User::factory(50)->create();
 
        (new JobSeeder())->run();
        (new ApplicationSeeder())->run();
    }
}
