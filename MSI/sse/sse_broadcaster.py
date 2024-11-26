import queue


class SSEBroadcaster:
    def __init__(self):
        self.subscribers = {"saint-ismier": [],
                            "saint-martin-d-heres": [],
                            "lans-en-vercors": []}

    def subscribe(self, station_name):
        if station_name in self.subscribers:
            subscriber = queue.Queue(maxsize=5)
            self.subscribers[station_name].append(subscriber)
            return subscriber

    def unsubscribe(self, station_name, subscriber):
        if station_name in self.subscribers:
            self.subscribers[station_name].remove(subscriber)

    def broadcast(self, station_name, message):
        dead_subscribers = []

        if station_name in self.subscribers:
            for subscriber in self.subscribers[station_name]:
                try:
                    subscriber.put_nowait(message)

                except queue.Full:
                    dead_subscribers.append(subscriber)

        for dead_subscriber in dead_subscribers:
            self.unsubscribe(station_name, dead_subscriber)
