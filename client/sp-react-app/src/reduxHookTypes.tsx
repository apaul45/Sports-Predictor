/*
    This file will be used to define types for redux hooks, 
    so that they don't have to be defined in every component that
    uses them. 

    Taken from redux start to ts page: https://redux-toolkit.js.org/tutorials/typescript#use-typed-hooks-in-components
*/
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../src/index'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector