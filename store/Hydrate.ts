import { HYDRATE } from 'next-redux-wrapper';
import { Action, PayloadAction } from '@reduxjs/toolkit';

function isHydrateAction(action: Action): action is PayloadAction<never> {
  return action.type === HYDRATE;
}

export const extractRehydrationInfo = <T = unknown>(
  action: Action,
  { reducerPath }: { reducerPath: string }
): T | undefined => {
  if (isHydrateAction(action)) {
    return action.payload[reducerPath];
  }
  return undefined;
};
