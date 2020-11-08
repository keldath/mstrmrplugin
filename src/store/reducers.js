// REDUCERS

import * as actionTypes from './actions';
import * as SELECTORSTATE from './stateTemplate';

import PanelStackSRC  from '../components/selectors/panelStack/panelStackSRC';//i should make a file with all srchtml fn's
import * as naming from '../layout/naming'
;
const initialState = {
       [naming.PANELSTACK]: {  ...SELECTORSTATE['SELECTORSTATE'][naming.PANELSTACK]
       }
}

export default (state=initialState, action) => {
    
    const getNextSelectorIdx = () => {
        let numbering = state[naming.PANELSTACK].selectorsNumbering;
        let highest = Math.max.apply(Math, numbering)+1
        return highest;
    }

    const getNextOptionIdx = () => {
      let numbering = state[naming.PANELSTACK][state[naming.PANELSTACK].selected].optionsNumbering;
      let highest = Math.max.apply(Math, numbering)+1
      return highest;
    }
    switch (action.type) {
     
      case actionTypes.ADD_SELECTOR:
          let newSNum = getNextSelectorIdx();
          let newSName = action.payload.concat(newSNum);
              return {
                  ...state,
                   [naming.PANELSTACK]: {...state[naming.PANELSTACK], 
                                [newSName] : {...SELECTORSTATE['SELECTORSTATE'][naming.PANELSTACK][naming.PANELSTACK.concat('0')]},
                                selectorsNumbering: [...state[naming.PANELSTACK].selectorsNumbering, newSNum],
                                selected: newSName,
                  }
          }
      
     case actionTypes.REMOVE_SELECTOR:
          //leave at least one selector
          let selNumr = state[naming.PANELSTACK].selectorsNumbering;
          /*todo - remove selector numbering
          let newSelNumbering =  selNumr.filter((item,idx)=> {
            let keep = false;
            if (item !== action.payload) {
              keep = true;
            }
            return keep
          })
          if (selNumr.length===1) {
            return {
              ...state
            }
          }
          */
          delete state[naming.PANELSTACK][state[naming.PANELSTACK].selected]
          return {
               ...state,
               [naming.PANELSTACK]: {...state[naming.PANELSTACK], selected: selNumr[0]}//revert to the first selector
        }
  
       
      case actionTypes.SELECTED:
        
          return {
            ...state,
            [naming.PANELSTACK]: {...state[naming.PANELSTACK], selected: action.payload}
          };    
      
      case actionTypes.ADD_OPTION:
         let newONum = getNextOptionIdx();
         //payload = selectorType: selectorType, selected: selected //later to identify to which selector to add
         return {
          ...state,
           [naming.PANELSTACK]: {...state[naming.PANELSTACK], 
                        [action.payload.selected] : {
                          ...state[naming.PANELSTACK][action.payload.selected],
                          options: {...state[naming.PANELSTACK][action.payload.selected].options,
                                    [newONum] : {...SELECTORSTATE['SELECTORSTATE'][naming.PANELSTACK][naming.PANELSTACK.concat('0')].options[0]}
                          },
                        optionsNumbering: [...state[naming.PANELSTACK][action.payload.selected].optionsNumbering, newONum],
                      },
          }
  }
  
      case actionTypes.REMOVE_OPTION:
        let opNum = state[naming.PANELSTACK][state[naming.PANELSTACK].selected].optionsNumbering;
        if (opNum.length === 1) {
          console.log(state[naming.PANELSTACK][state[naming.PANELSTACK].selected].options[opNum[0]])
          alert('Must Contain atleast one option')
          //instead of delete the option it will reset the one existing and clean its values.
          return {
            ...state,
             [naming.PANELSTACK]: {...state[naming.PANELSTACK], 
                          [state[naming.PANELSTACK].selected] : {
                            ...state[naming.PANELSTACK][state[naming.PANELSTACK].selected],
                            options: {...state[naming.PANELSTACK][state[naming.PANELSTACK].selected].options,
                                      [opNum[0]] : {...SELECTORSTATE['SELECTORSTATE'][naming.PANELSTACK][naming.PANELSTACK.concat('0')].options[0]}
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
        console.log(state[naming.PANELSTACK][state[naming.PANELSTACK].selected].options[action.payload])
        delete state[naming.PANELSTACK][state[naming.PANELSTACK].selected].options[action.payload]
        return {
          ...state,
          [naming.PANELSTACK]: {...state[naming.PANELSTACK], [state[naming.PANELSTACK].selected] : {...state[naming.PANELSTACK][state[naming.PANELSTACK].selected] , 
            optionsNumbering: newNumbering}
            }
          };

      case actionTypes.INPUT_CHANGE:

          if (action.payload.optionIdx != null) {
            return {
              ...state,
              [naming.PANELSTACK]: {...state[naming.PANELSTACK], [state[naming.PANELSTACK].selected] : {...state[naming.PANELSTACK][state[naming.PANELSTACK].selected] , 
                                                                    [action.payload.inputSource]: {...state[naming.PANELSTACK][state[naming.PANELSTACK].selected][action.payload.inputSource], 
                                                                    [action.payload.optionIdx] : {...state[naming.PANELSTACK][state[naming.PANELSTACK].selected][action.payload.inputSource][action.payload.optionIdx],
                                                                      [action.payload.inputData.name]: action.payload.inputData.value} }}
                                                                    }
                                                                     
              };
          }
          else {
            return {
              ...state,
              [naming.PANELSTACK]: {...state[naming.PANELSTACK], [state[naming.PANELSTACK].selected] : {...state[naming.PANELSTACK][state[naming.PANELSTACK].selected] , 
                                                                    [action.payload.inputSource]: {...state[naming.PANELSTACK][state[naming.PANELSTACK].selected][action.payload.inputSource], 
                                                                      [action.payload.inputData.name]: action.payload.inputData.value} }}
                                                                     
              };
          }          
      
       case actionTypes.SUBMIT:
           // console.log(PanelStackSRC({...state.panelStack[state.panelStack.selected]}))
            return {
              ...state,
                [naming.PANELSTACK]: {...state[naming.PANELSTACK], 
                           [state[naming.PANELSTACK].selected] : 
                            {...state[naming.PANELSTACK][state[naming.PANELSTACK].selected] ,
                             html : PanelStackSRC({...state[naming.PANELSTACK][state[naming.PANELSTACK].selected]})
                          }
            }
          }

      default:
        return state;
    }
  };