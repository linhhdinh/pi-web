import { describe, expect, it, vi } from "vitest";
import { readClipboardText } from "./clipboard";

describe("readClipboardText", () => {
  it("returns undefined in insecure contexts without touching the Clipboard API", async () => {
    const readText = vi.fn(() => Promise.resolve("hello"));

    const text = await readClipboardText({ isSecureContext: false, readText });

    expect(text).toBeUndefined();
    expect(readText).not.toHaveBeenCalled();
  });

  it("returns undefined when the Clipboard API is unavailable", async () => {
    const text = await readClipboardText({ isSecureContext: true });

    expect(text).toBeUndefined();
  });

  it("returns clipboard text in secure contexts", async () => {
    const readText = vi.fn(() => Promise.resolve("hello"));

    const text = await readClipboardText({ isSecureContext: true, readText });

    expect(text).toBe("hello");
    expect(readText).toHaveBeenCalled();
  });

  it("returns undefined when the Clipboard API rejects", async () => {
    const readText = vi.fn(() => Promise.reject(new Error("denied")));

    const text = await readClipboardText({ isSecureContext: true, readText });

    expect(text).toBeUndefined();
  });
});
