import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Testing Library only auto-cleans when global `afterEach` is available, which
// it is not without `globals: true`. Without this, rendered components leak
// between tests and role queries match elements from earlier cases.
afterEach(() => {
  cleanup();
});