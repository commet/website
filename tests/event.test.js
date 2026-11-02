import test from "node:test";
import assert from "node:assert/strict";
import { eventState } from "../src/event.js";

test("registration remains open through the stated final minute in Korea", () => {
  assert.equal(
    eventState(Date.parse("2026-11-15T23:59:59+09:00")),
    "applications-open",
  );
  assert.equal(eventState(Date.parse("2026-11-16T00:00:00+09:00")), "upcoming");
});
test("after registration closes, the event remains upcoming until its end", () => {
  assert.equal(eventState(Date.parse("2026-12-05T17:59:59+09:00")), "upcoming");
  assert.equal(eventState(Date.parse("2026-12-05T18:00:00+09:00")), "past");
});
