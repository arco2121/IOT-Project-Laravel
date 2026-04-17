import { echo } from "../echo.js";

document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = document.getElementById('message').value;
    const status = document.getElementById('status');

    try {
        const response = await fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document
                    .querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        if(data.ok) {
            toastr.success("Messaggio inviato correttamente");
        } else {
            toastr.error("Errore");
        }

    } catch (error) {
        console.error(error);
        status.innerText = '❌ Errore invio';
    }
});


echo.channel('esp32')
    .listen('MqttMessageReceived', (data) => {

        console.log("Message");
        const message = JSON.parse(data.message);
        console.log(message);

        console.log("Topic");
        console.log(data.topic);

        let s = data.topic;
        s += "</br>";
        if(message.type === 'button_pressed') {
            s += "E' stato premuto il pulsante del device: ";
            s += message.device;
        }

        toastr.success(s);
    });
