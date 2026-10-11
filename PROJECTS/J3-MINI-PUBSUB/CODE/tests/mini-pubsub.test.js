const assert = require("node:assert/strict");
const createPubSub = require("../src/mini-pubsub");

function checkTest(testName, callback) {
  callback();
  console.log(`✅ PASS — ${testName}`);
}

checkTest("one listener receives a published payload", () => {
  const bus = createPubSub();
  const received = [];

  bus("subscribe", "saved", (payload) => received.push(payload));

  assert.equal(bus("publish", "saved", "file-1"), 1);
  assert.deepEqual(received, ["file-1"]);
});

checkTest("listeners run in registration order", () => {
  const bus = createPubSub();
  const order = [];

  bus("subscribe", "saved", () => order.push("toast"));
  bus("subscribe", "saved", () => order.push("audit"));

  assert.equal(bus("publish", "saved", "file-2"), 2);
  assert.deepEqual(order, ["toast", "audit"]);
});

checkTest("different events stay isolated", () => {
  const bus = createPubSub();
  const received = [];

  bus("subscribe", "saved", () => received.push("saved"));
  bus("subscribe", "failed", () => received.push("failed"));

  bus("publish", "saved", "file-3");

  assert.deepEqual(received, ["saved"]);
});

checkTest("unsubscribe removes only its own listener", () => {
  const bus = createPubSub();
  const received = [];

  const removeToast = bus("subscribe", "saved", () => received.push("toast"));
  bus("subscribe", "saved", () => received.push("audit"));

  removeToast();
  assert.equal(bus("publish", "saved", "file-4"), 1);
  assert.deepEqual(received, ["audit"]);
});

checkTest("repeated unsubscribe and empty publish are safe", () => {
  const bus = createPubSub();
  const removeListener = bus("subscribe", "saved", () => {});

  removeListener();
  removeListener();

  assert.equal(bus("publish", "saved", "file-5"), 0);
  assert.equal(bus("publish", "", "file-6"), 0);
  assert.equal(bus("unknown", "saved", "file-7"), 0);
});

checkTest("duplicate subscription notifies once", () => {
  const bus = createPubSub();
  let calls = 0;
  const listener = () => {
    calls += 1;
  };

  bus("subscribe", "saved", listener);
  bus("subscribe", "saved", listener);

  assert.equal(bus("publish", "saved", "file-8"), 1);
  assert.equal(calls, 1);
});

checkTest("publish returns the notified-listener count", () => {
  const bus = createPubSub();

  bus("subscribe", "saved", () => {});
  bus("subscribe", "saved", () => {});
  bus("subscribe", "failed", () => {});

  assert.equal(bus("publish", "saved", "file-9"), 2);
});

checkTest("separate buses stay independent and preserve payload", () => {
  const firstBus = createPubSub();
  const secondBus = createPubSub();
  const firstReceived = [];
  const secondReceived = [];

  firstBus("subscribe", "saved", (payload) => firstReceived.push(payload));
  secondBus("subscribe", "saved", (payload) => secondReceived.push(payload));

  firstBus("publish", "saved", "first-file");

  assert.deepEqual(firstReceived, ["first-file"]);
  assert.deepEqual(secondReceived, []);
});

console.log("J3 Save-Signal Engine test suite passed.");
