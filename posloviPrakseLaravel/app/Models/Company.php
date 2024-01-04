<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'contact_info', 'website', 'industry','logo'
    ];

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }

}
