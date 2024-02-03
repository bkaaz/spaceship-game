import { KeyboardHandler } from "@src/utils/keyboard-handler";

describe("KeyboardHandler", () => {
  let keyboardHandler: KeyboardHandler;

  beforeEach(() => {
    keyboardHandler = new KeyboardHandler();
    keyboardHandler.setup();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
  });

  test("isKeyPressed returns true for pressed key", () => {
    expect(keyboardHandler["keyState"]["ArrowUp"]).toBe(true);
  });

  test("isKeyPressed returns false for not pressed key", () => {
    expect(keyboardHandler["keyState"]["ArrowDown"]).toBeFalsy();
  });

  test("key release updates state correctly", () => {
    document.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowUp" }));
    expect(keyboardHandler["keyState"]["ArrowUp"]).toBe(false);
  });
});
