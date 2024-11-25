import queue


class SSEBroadcaster:
    def __init__(self):
        self.subscribers = {}

    def subscribe(self, station_id):
        if station_id not in self.subscribers:
            self.subscribers[station_id] = []
        subscriber = queue.Queue(maxsize=5)
        self.subscribers[station_id].append(subscriber)
        return subscriber

    def unsubscribe(self, station_id, subscriber):
        if station_id in self.subscribers:
            self.subscribers[station_id].remove(subscriber)
            # if not self.subscribers[station_id]:
            #     del self.subscribers[station_id]

    def broadcast(self, station_id, message):
        dead_subscribers = []

        if station_id in self.subscribers:
            for subscriber in self.subscribers[station_id]:
                try:
                    subscriber.put_nowait(message)

                except queue.Full:
                    dead_subscribers.append(subscriber)

        for dead_subscriber in dead_subscribers:
            self.unsubscribe(station_id, dead_subscriber)
