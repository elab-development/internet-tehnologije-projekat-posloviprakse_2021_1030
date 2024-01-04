<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->jobTitle,
            'description' => $this->faker->paragraph,
            'deadline' => $this->faker->date,
            'salary' => $this->faker->randomFloat(2, 1000, 5000),
            'location' => $this->faker->city,
            'requirements' => $this->faker->sentence,
            'company_id' => random_int(1,Company::count())
        ];
    }
}
