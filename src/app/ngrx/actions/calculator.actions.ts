import {createAction, props} from '@ngrx/store';

export const enterNumber = createAction('[Calculator] Enter Number',
  props<{ number: string }>()
);

export const enterOperator = createAction('[Calculator] Enter Operator',
  props<{ operator: string }>()
);


export const calculateResult = createAction('[Calculator] Calculate Result');

export const clear = createAction('[Calculator] Clear');

export const deleteNumber = createAction('[Calculator] Delete');
