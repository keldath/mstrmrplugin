// REDUCERS

import * as actionTypes from './actions';
import * as SELECTORSTATE from './stateTemplate';

const initialState = {
       panelStack: { /*panelStack0 :{
                     maindef: {...SELECTORSTATE['SELECTORSTATE']['panelStack'].maindef},
                     options: {...SELECTORSTATE['SELECTORSTATE']['panelStack'].options}
                     },
                     selectorsNumbering: SELECTORSTATE['SELECTORSTATE']['panelStack'].selectorsNumbering,
                     optionsNumbering: SELECTORSTATE['SELECTORSTATE']['panelStack'].optionsNumbering,
                     selected: SELECTORSTATE['SELECTORSTATE']['panelStack'].selected*/
                     ...SELECTORSTATE['SELECTORSTATE']['panelStack']
      }
}
export default (state=initialState, action) => {
    
    const getNextSelectorIdx = () => {
        let numbering = state.panelStack.selectorsNumbering;
        let highest = Math.max.apply(Math, numbering)+1
        return highest;
    }

    const getNextOptionIdx = () => {
      let numbering = state.panelStack[state.panelStack.selected].optionsNumbering;
      let highest = Math.max.apply(Math, numbering)+1
      return highest;
    }
    switch (action.type) {
     
      case actionTypes.ADD_SELECTOR:
          let newSNum = getNextSelectorIdx();
          let newSName = action.payload.concat(newSNum);
              return {
                  ...state,
                   panelStack: {...state.panelStack, 
                                [newSName] : {...SELECTORSTATE['SELECTORSTATE']['panelStack']['panelStack0']},
                                selectorsNumbering: [...state.panelStack.selectorsNumbering, newSNum],
                                selected: newSName,
                  }
          }

      case actionTypes.SELECTED:
        
          return {
            ...state,
            panelStack: {...state.panelStack, selected: action.payload}
          };    
      
      case actionTypes.ADD_OPTION:
         let newONum = getNextOptionIdx();
         //payload = selectorType: selectorType, selected: selected //later to identify to which selector to add
         return {
          ...state,
           panelStack: {...state.panelStack, 
                        [action.payload.selected] : {
                          ...state.panelStack[action.payload.selected],
                          options: {...state.panelStack[action.payload.selected].options,
                                    [newONum] : {...SELECTORSTATE['SELECTORSTATE']['panelStack']['panelStack0'].options[0]}
                          },
                        optionsNumbering: [...state.panelStack[action.payload.selected].optionsNumbering, newONum],
                      },
          }
  }
  
      case actionTypes.REMOVE_OPTION:
       
          
        return {
          ...state
        };

      case actionTypes.INPUT_CHANGE:

          if (action.payload.optionIdx != null) {
            return {
              ...state,
              panelStack: {...state.panelStack, [state.panelStack.selected] : {...state.panelStack[state.panelStack.selected] , 
                                                                    [action.payload.inputSource]: {...state.panelStack[state.panelStack.selected][action.payload.inputSource], 
                                                                    [action.payload.optionIdx] : {...state.panelStack[state.panelStack.selected][action.payload.inputSource][action.payload.optionIdx],
                                                                      [action.payload.inputData.name]: action.payload.inputData.value} }}
                                                                    }
                                                                     
              };
          }
          else {
            return {
              ...state,
              panelStack: {...state.panelStack, [state.panelStack.selected] : {...state.panelStack[state.panelStack.selected] , 
                                                                    [action.payload.inputSource]: {...state.panelStack[state.panelStack.selected][action.payload.inputSource], 
                                                                      [action.payload.inputData.name]: action.payload.inputData.value} }}
                                                                     
              };
          }          

      default:
        return state;
    }
  };