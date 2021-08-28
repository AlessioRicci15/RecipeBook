import { Ingredient } from "../ingredient.model";
import * as ShoppingListAction from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListAction.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListAction.UPDATE_INGREDIENT:
      const updateIngredients = [...state.ingredients];
      updateIngredients[state.editedIngredientIndex] = action.payload;
      return {
        ...state,
        ingredients: updateIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    case ShoppingListAction.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => {
          return index !== state.editedIngredientIndex;
        }),
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    case ShoppingListAction.START_EDIT:
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIndex: action.payload,
      };
    case ShoppingListAction.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    default:
      return state;
  }
}
