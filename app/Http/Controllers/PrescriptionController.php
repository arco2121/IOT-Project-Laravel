<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Medicine;
use App\Models\Prescription;
use Illuminate\Http\Request;

class PrescriptionController extends Controller
{
    public function index()
    {
        $users = User::all();
        $medicines = Medicine::all();
        $days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
        $times = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

        // Definiamo le variabili richieste dal tuo layout
        $title = "Gestione Prescrizioni";
        $page = "dashboards.prescrizioni"; // Questo caricherà 'resources/css/test.css' (come visto nel tuo codice)
        $params = [];   // Un array vuoto per ora, per evitare l'errore undefined

        return view('layouts.app', [
            'users' => User::all(),
            'medicines' => Medicine::all(),
            'days' => ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
            'times' => ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
            'title' => "Gestione Prescrizioni",
            'page' => "dashboards.prescrizioni", // Questo dice al layout cosa includere
            'params' => []
        ]);
    }

    public function store(Request $request)
    {
        $patientId = $request->input('patient_id');
        $schedule = $request->input('schedule'); // Array con [giorno][step] = medicine_id

        foreach ($schedule as $day => $steps) {
            foreach ($steps as $step => $medicineId) {
                if ($medicineId) {
                    // Calcolo orario basato sullo step (1=08:00, 2=10:00, ecc.)
                    $baseTime = 8 + (($step - 1) * 2);
                    $scheduledTime = sprintf('%02d:00:00', $baseTime);

                    Prescription::create([
                        'patient_id' => $patientId,
                        'medicine_id' => $medicineId,
                        'day' => $day,
                        'step' => $step,
                        'scheduled_time' => $scheduledTime,
                        'amount' => 1
                    ]);
                }
            }
        }

        return redirect()->back()->with('success', 'Piano prescrizioni salvato correttamente!');
    }
}
