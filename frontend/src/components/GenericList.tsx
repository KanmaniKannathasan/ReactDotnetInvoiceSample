import React from 'react';

/**
 * GenericList is a reusable component that renders any list of items using a render prop.
 * Demonstrates TypeScript generics and flexible component design.
 */
type GenericListProps<T> = {
  items: T[];
  render: (item: T) => React.ReactNode;
};

export function GenericList<T>({ items, render }: GenericListProps<T>) {
  return <ul>{items.map(render)}</ul>;
}