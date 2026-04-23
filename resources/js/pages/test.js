import { echo } from "../echo.js";

document.getElementById('messagemqtt').addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = document.getElementById("message").value;
    try {
        const response = await fetch('/sendMqtt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document
                    .querySelector('input[name="_token"]').content
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        if(data.ok)
            alert("Messaggio inviato correttamente");
        else
            alert("Errore");
    } catch (error) {
        console.error(error);
        alert(error.message)
    }
});

setInterval(() => document.getElementById("status").innerText = echo.connectionStatus(), 1000);
echo.channel('esp32')
    .listen('MqttMessageReceived', (data) => {
        const { topic, message } = data;
        const str = "Topic '" + topic + "' => " + message
        console.log(str);
    });
