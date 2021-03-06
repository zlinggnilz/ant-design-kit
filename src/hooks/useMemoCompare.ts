import { useRef, useMemo, useEffect } from 'react';
import isEqual from 'lodash.isequal';

function compare(previous: any, next: any) {
  let ifEqual;
  if (previous == null && next == null) {
    return true;
  }
  try {
    ifEqual = isEqual(previous, next);
  } catch (error) {
    ifEqual = false;
  }
  return ifEqual;
}

export function useCompare(defaultValue: any, next: any) {
  // Ref for storing previous value
  const previousRef = useRef(defaultValue);
  const previous = previousRef.current;

  const ifEqual = useMemo(() => compare(previous, next), [next]);

  useEffect(() => {
    if (!ifEqual) {
      previousRef.current = next;
    }
  });

  return !ifEqual;
}

export function useMemoCompare(next: any) {
  // Ref for storing previous value
  const previousRef = useRef();
  const previous = previousRef.current;

  const isEqual = compare(previous, next);

  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });
  return isEqual ? previous : next;
}
