interface Notifier {
  sendNotification: (payload: NotifyPayload) => Promise<void>;
}

class NotifyPayload {
  to: string;
  title: string;
  message: string;

  constructor(to: string, title: string, message: string) {
    this.to = to;
    this.title = title;
    this.message = message;
  }
}
