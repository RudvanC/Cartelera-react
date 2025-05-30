import "@testing-library/jest-dom"; // Matchers extendidos para expect (toBeInTheDocument, etc.)
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});
