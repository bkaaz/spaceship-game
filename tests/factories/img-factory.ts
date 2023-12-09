export function createMockedImage(
  overrides: Partial<HTMLImageElement>,
): HTMLImageElement {
  const mockImg = document.createElement("img");
  return {
    ...mockImg,
    ...overrides,
  };
}
