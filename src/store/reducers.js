// REDUCERS

import * as actionTypes from './actions';
import * as SELECTORSTATE from './stateTemplate';

import PanelStackSRC  from '../components/selectors/panelStack/panelStackSRC';//i should make a file with all srchtml fn's
//import * as naming from '../../layout/naming';

const initialState = {
       panelStack: {  ...SELECTORSTATE['SELECTORSTATE']['panelStack']
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
        let opNum = state.panelStack[state.panelStack.selected].optionsNumbering;
        if (opNum.length === 1) {
          console.log(state.panelStack[state.panelStack.selected].options[opNum[0]])
          alert('Must Contain atleast one option')
          //instead of delete the option it will reset the one existing and clean its values.
          return {
            ...state,
             panelStack: {...state.panelStack, 
                          [state.panelStack.selected] : {
                            ...state.panelStack[state.panelStack.selected],
                            options: {...state.panelStack[state.panelStack.selected].options,
                                      [opNum[0]] : {...SELECTORSTATE['SELECTORSTATE']['panelStack']['panelStack0'].options[0]}
                              }
                         }
        }
        }}
       let newNumbering =  opNum.filter((item,idx)=> {
          let keep = false;
          if (item !== action.payload) {
            keep = true;
          }
          return keep
        })
        console.log(state.panelStack[state.panelStack.selected].options[action.payload])
        delete state.panelStack[state.panelStack.selected].options[action.payload]
        return {
          ...state,
          panelStack: {...state.panelStack, [state.panelStack.selected] : {...state.panelStack[state.panelStack.selected] , 
            optionsNumbering: newNumbering}
            }
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
      
       case actionTypes.SUBMIT:
            console.log(PanelStackSRC({...state.panelStack[state.panelStack.selected]}))
            return {
              ...state,
              panelStack: {...state.panelStack, 
                           [state.panelStack.selected] : 
                            {...state.panelStack[state.panelStack.selected] ,
                             html : PanelStackSRC({...state.panelStack[state.panelStack.selected]})
                          }
            }
          }

      default:
        return state;
    }
  };