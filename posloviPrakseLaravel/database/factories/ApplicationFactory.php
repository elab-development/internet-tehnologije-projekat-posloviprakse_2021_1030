<?php

namespace Database\Factories;

use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Application>
 */
class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => random_int(1,User::count()),
            'job_id' => random_int(1,Job::count()),
            'status' => $this->faker->randomElement(['pending', 'accepted', 'rejected']),
            'cover_letter' => $this->faker->paragraph,
            'resume' => $this->faker->text,

        ];
    }
}
