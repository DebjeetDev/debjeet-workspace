function createPubSub() {
  const subscriptions = [];

  return function dispatch(action, eventName, value) {
    if (action === "subscribe") {
      const validEvent =
        typeof eventName === "string" && eventName.trim() !== "";
      const validListener = typeof value === "function";

      if (!validEvent || !validListener) {
        return function noop() {};
      }

      const duplicate = subscriptions.some(
        (subscription) =>
          subscription[0] === eventName && subscription[1] === value,
      );

      if (duplicate) {
        return function noop() {};
      }

      const subscription = [eventName, value];
      subscriptions.push(subscription);
      let active = true;

      return function unsubscribe() {
        if (!active) return;
        active = false;

        const subscriptionIndex = subscriptions.indexOf(subscription);
        if (subscriptionIndex !== -1) {
          subscriptions.splice(subscriptionIndex, 1);
        }
      };
    }

    if (action === "publish") {
      const validEvent =
        typeof eventName === "string" && eventName.trim() !== "";

      if (!validEvent) return 0;

      const matchingListeners = subscriptions
        .filter((subscription) => subscription[0] === eventName)
        .map((subscription) => subscription[1]);

      matchingListeners.forEach((listener) => listener(value));
      return matchingListeners.length;
    }

    return 0;
  };
}

module.exports = createPubSub;
