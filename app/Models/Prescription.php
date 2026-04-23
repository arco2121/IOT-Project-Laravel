<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prescription extends Model
{
    // Permette il salvataggio di massa per questi campi
    protected $fillable = [
        'patient_id',
        'medicine_id',
        'step',
        'day',
        'scheduled_time',
        'amount'
    ];

    // Relazione: Questa prescrizione appartiene a un paziente (User)
    public function patient(): BelongsTo
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    // Relazione: Questa prescrizione riguarda un medicinale specifico
    public function medicine(): BelongsTo
    {
        return $this->belongsTo(Medicine::class);
    }
}
