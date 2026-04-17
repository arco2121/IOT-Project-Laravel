<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
class MqttMessageReceived implements ShouldBroadcastNow
{
    public string $topic;
    public string $message;
    public function __construct($topic, $message)
    {
        $this->topic = $topic;
        $this->message = $message;
    }
    public function broadcastOn(): Channel
    {
        return new Channel('esp32');
    }
}
