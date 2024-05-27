<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Job extends Model
{ 
    use HasFactory, SoftDeletes;  //Dodat soft delete za seminarski rad
    //kada brisemo objekat iz baze nece se stvarno obrisati taj red u tabeli nego ce dobiti vrednost u koloni deleted_at, pa cemo
    //znati da je taj objekat obrisan, a ako ta kolona ima vrednost null tada znamo da objekat nije obrisan
    //za ovo je potrebno dodati i migraciju

    protected $fillable = [
        'title', 'description', 'deadline', 'salary', 'location', 'requirements','company_id'
    ];
    public function company()
    {
        return $this->belongsTo(Company::class);
    }
    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
