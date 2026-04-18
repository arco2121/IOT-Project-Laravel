import { fromServer } from '../bridge.js';

const saveBtn = document.getElementById("saveBtn");
const selectPaziente = document.getElementById("paziente-select")
const tutteLePrescrizioni = fromServer['prescrizioniPerPaziente'];

const cambiaPaziente = (pazienteId) => {
    const prescrizioni = tutteLePrescrizioni[pazienteId] ?? {};

    document.querySelectorAll('select[data-giorno]').forEach(sel => {
        const val = prescrizioni[sel.dataset.giorno]?.[sel.dataset.orario] ?? '';
        sel.value = String(val);
    });
};

const salva = async () => {
    const pazienteId = document.getElementById('paziente-select').value;

    if (!pazienteId) {
        mostraStato('Seleziona prima un paziente.', 'error');
        return;
    }

    const prescrizioni = {};
    document.querySelectorAll('select[data-giorno]').forEach(sel => {
        const g = sel.dataset.giorno;
        const o = sel.dataset.orario;
        if (!prescrizioni[g]) prescrizioni[g] = {};
        prescrizioni[g][o] = sel.value || null;
    });

    try {
        const response = await fetch('/prescrizioniDottore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').content,
            },
            body: JSON.stringify({ paziente_id: pazienteId, prescrizioni }),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();
        mostraStato(result.message ?? 'Salvato con successo!', 'ok');

        tutteLePrescrizioni[pazienteId] = prescrizioni;

    } catch (err) {
        mostraStato('Errore durante il salvataggio: ' + err.message, 'error');
    }
};

const mostraStato = (msg, tipo)=> {
    const el = document.getElementById('stato');
    el.textContent = msg;
    el.className = tipo;
    setTimeout(() => { el.className = ''; el.style.display = 'none'; }, 4000);
};

saveBtn.addEventListener("click" , salva);
selectPaziente.addEventListener("change", (e) => cambiaPaziente(e.target.value));
