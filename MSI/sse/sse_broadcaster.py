import queue


class SSEBroadcaster:
    def __init__(self):
        self.subscribers = []

    def subscribe(self):
        subscriber = queue.Queue(maxsize=5)
        self.subscribers.append(subscriber)
        return subscriber

    def unsubscribe(self, subscriber):
        self.subscribers.remove(subscriber)

    def broadcast(self, message):
        dead_subscribers = []

        for subscriber in self.subscribers:
            try:
                subscriber.put_nowait(message)

            except queue.Full:
                dead_subscribers.append(subscriber)

        for dead_subscriber in dead_subscribers:
            self.unsubscribe(dead_subscriber)
