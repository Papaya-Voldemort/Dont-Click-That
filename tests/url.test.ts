import { afterEach, describe, expect, spyOn, test } from "bun:test";
import { generateURLLevel, parseURL, safeURLs } from "../src/lib/functions/url";
import type { url } from "../src/lib/stores/levels";

function formatURL(value: url) {
  return `${value.protocol}://${value.subdomain ? value.subdomain + "." : ""}${value.domain}.${value.tld}${value.path || ""}`;
}

afterEach(() => {
  randomSpy?.mockRestore();
});
let randomSpy: ReturnType<typeof spyOn>;

describe("URL challenges", () => {
  test("preserves every known address including subdomains and paths", () => {
    for (const address of safeURLs) expect(formatURL(parseURL(address))).toBe(address);
    expect(parseURL("https://www.example.co.uk")).toMatchObject({
      subdomain: "www",
      domain: "example",
      tld: "co.uk",
    });
  });

  test("safe generated challenges preserve each original hostname", () => {
    randomSpy = spyOn(Math, "random");
    for (let i = 0; i < safeURLs.length; i++) {
      randomSpy.mockReturnValueOnce((i + 0.1) / safeURLs.length).mockReturnValueOnce(0);
      const challenge = generateURLLevel("easy");
      expect(formatURL(challenge.content as url)).toBe(safeURLs[i]);
      expect(challenge.scoreValues.find((answer) => answer.value === 1)?.name).toBe("safe");
    }
  });

  test("typos always change the registered domain", () => {
    randomSpy = spyOn(Math, "random").mockReturnValue(0.9);
    const challenge = generateURLLevel("easy");
    const content = challenge.content as url;
    expect(
      safeURLs.some(
        (address) => new URL(address).hostname === new URL(formatURL(content)).hostname,
      ),
    ).toBe(false);
    expect(challenge.scoreValues.find((answer) => answer.value === 1)?.name).toBe("threat");
  });
});
