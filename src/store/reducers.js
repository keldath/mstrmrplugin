// REDUCERS

import * as actionTypes from './actions';

const initialState = {
      selectorsNumbering: [0],
      selected: 'new',
      panelStack: {
          new : {
              mainDef : {
                  id: 'id',
                  linker: '',
                  text: '',
                  defaultName: '',
                  subselector: ''
              },
              options : {
                first : {
                  idx: '',
                  affectedT: '', 
                  alias : '',
                }
              }
          },
      },
      sheetPanel: {}
}

const randomIdGen = () => {
  let numbering = initialState.selectorsNumbering;
  let highest = Math.max.apply(Math, numbering)+1
  initialState.selectorsNumbering = [...numbering,highest]
  console.log(initialState.selectorsNumbering)
  return highest;
}

export default (state=initialState, action) => {
    
    switch (action.type) {
      case actionTypes.COUNTER_INCREMENT:

        return {
          ...state,
          counter: state.counter + 1
        };

      case actionTypes.COUNTER_DECREMENT:
        return {
          ...state,
          counter: state.counter - 1
        };
      
      case actionTypes.ADD_SELECTOR:
         let numbering = state.selectorsNumbering;
         /*since the numbering have a 0 (the new template)
           on a selectio addition, theres a need to add the initial template and a new secind selector
           the first selector does not exist until a submit or an add selector.
         */
         if (numbering.length === 1) {
            console.log(numbering.length)
               return {
                ...state,
                selectorsNumbering: [...state.selectorsNumbering,1],
                panelStack: {...state.panelStack, [action.payload.concat(0)] : {...state.panelStack.new}, 
                                                  [action.payload.concat(randomIdGen())] : {...state.panelStack.new}}
              }
        } 
        return {
              ...state,
              panelStack: {...state.panelStack, [action.payload.concat(randomIdGen())] : {...state.panelStack.new}}
        }
      case actionTypes.ADD_OPTION:

        return {
          ...state,
          counter: state.counter + 1
        };
  
      case actionTypes.REMOVE_OPTION:
        return {
          ...state,
          counter: state.counter - 1
        };
      case actionTypes.SELECTED:
        return {
          ...state,
          selected: action.payload
        };    
      case actionTypes.SUBMIT:
          console.log(action.payload.selectorType)
          let selectorId = action.payload.selected;
          if (selectorId === 'new') {
              selectorId = action.payload.selectorType.concat(randomIdGen())
          }
          return {
            ...state,
            selected: selectorId,
            panelStack: {...state.panelStack, [selectorId] : action.payload.data}
          };                

      default:
        return state;
    }
  };