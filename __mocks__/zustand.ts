import { act } from '@testing-library/react-native';
import * as zustand from 'zustand';

const { create: actualCreate } = jest.requireActual<typeof zustand>('zustand');

// Store references for reset
export const storeResetFns = new Set<() => void>();

// Wrap create to capture initial state
const createUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// Export wrapped create
export const create = (<T>(stateCreator: zustand.StateCreator<T>) => {
  return typeof stateCreator === 'function'
    ? createUncurried(stateCreator)
    : createUncurried;
}) as typeof zustand.create;

// Reset all stores between tests
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => resetFn());
  });
});
