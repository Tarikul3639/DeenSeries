import {
  useDispatch,
  useSelector,
  TypedUseSelectorHook,
} from "react-redux";

import type { RootState, AppDispatch } from "@/store";

/* typed dispatch */
export const useAppDispatch: () => AppDispatch = useDispatch;

/* typed selector */
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;