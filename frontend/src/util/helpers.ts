const defaultDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export const formatDate = (date: Date) => {
  return defaultDateFormatter.format(new Date(date));
};

export const deepEqual = (a: any, b: any) => {
  if (a === b) {
    // Covers primitives and reference equality
    return true;
  }

  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null
  ) {
    // One is null or not an object
    return false;
  }

  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }

    const valA = (a as any)[key];
    const valB = (b as any)[key];

    if (!deepEqual(valA, valB)) {
      return false;
    }
  }

  return true;
};
