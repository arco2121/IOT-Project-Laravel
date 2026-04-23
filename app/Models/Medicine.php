<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Medicine extends Model
{
    // Permette di salvare il nome della medicina
    protected $fillable = ['name'];

    // Opzionale: Una medicina può essere presente in molte prescrizioni
    public function prescriptions(): HasMany
    {
        return $this->hasMany(Prescription::class);
    }
}
