// REDUCERS

import * as actionTypes from './actions';
import * as SELECTORSTATE from './stateTemplate';

//need to do lazy loading for each selector
//import PanelStackSRC  from '../components/selectors/panelStack/panelStackSRC';//i should make a file with all srchtml fn's
//import * as naming from '../layout/naming';

console.log(Object.values(SELECTORSTATE))

const initialState = {
       ...Object.values(SELECTORSTATE)[0],
       routePath: 'Home'
}

/*
const initialState = {
      [naming.PANELSTACK]: {  ...SELECTORSTATE['SELECTORSTATE'][naming.PANELSTACK]},
      [naming.SHEETPANEL]: {  ...SELECTORSTATE['SELECTORSTATE'][naming.SHEETPANEL]},
       routePath: 'Home'
}*/
 
export default (state=initialState, action) => {
    
    console.log(action)
    const getNextSelectorIdx = () => {
        let numbering = state[action.payload.seltype].selectorsNumbering;
        let highest = Math.max.apply(Math, numbering)+1
        return highest;
    }

    const getNextOptionIdx = () => {
      let numbering = state[action.payload.seltype][state[action.payload.seltype].selected].optionsNumbering;
      let highest = Math.max.apply(Math, numbering)+1
      return highest;
    }
    switch (action.type) {
     
      case actionTypes.ADD_SELECTOR:
          let newSNum = getNextSelectorIdx();
          let newSName = action.payload.seltype.concat(newSNum);
              return {
                  ...state,
                   [action.payload.seltype]: {...state[action.payload.seltype], 
                                [newSName] : {...SELECTORSTATE['SELECTORSTATE'][action.payload.seltype][action.payload.seltype.concat('0')]},
                                selectorsNumbering: [...state[action.payload.seltype].selectorsNumbering, newSNum],
                                selected: newSName,
                  }
          }
      
     case actionTypes.REMOVE_SELECTOR:
          //leave at least one selector
          let selNumr = state[action.payload.seltype].selectorsNumbering;
          let selectedIdx = state[action.payload.seltype].selected.split(action.payload.seltype)[1]
          if (selNumr.length > 1) {
            selNumr = selNumr.filter((item,idx)=> {
              return item.toString() !== selectedIdx;
            })
            delete state[action.payload.seltype][state[action.payload.seltype].selected]
            return {
                   ...state,
                   [action.payload.seltype]: {...state[action.payload.seltype], 
                                          selected: action.payload.seltype.concat(selNumr[0]),
                                          selectorsNumbering: selNumr
                  }
            }
          }
          else {
            alert('Must Contain atleast one Selector')
            return {
                ...state
            }
          }
          
  
       
      case actionTypes.SELECTED:
        
          return {
            ...state,
            [action.payload.seltype]: {...state[action.payload.seltype], selected: action.payload.selected}
          };    
      
      case actionTypes.ADD_OPTION:
        console.log(action)
        console.log(state)
         let newONum = getNextOptionIdx();
         //payload = selectorType: selectorType, selected: selected //later to identify to which selector to add
         return {
          ...state,
           [action.payload.seltype]: {...state[action.payload.seltype], 
                        [action.payload.selected] : {
                          ...state[action.payload.seltype][action.payload.selected],
                          options: {...state[action.payload.seltype][action.payload.selected].options,
                                    [newONum] : {...SELECTORSTATE['SELECTORSTATE'][action.payload.seltype][action.payload.seltype.concat('0')].options[0]}
                          },
                        optionsNumbering: [...state[action.payload.seltype][action.payload.selected].optionsNumbering, newONum],
                      },
          }
  }
  
      case actionTypes.REMOVE_OPTION:

        let opNum = state[action.payload.seltype][state[action.payload.seltype].selected].optionsNumbering;
        console.log(opNum)
        if (opNum.length === 1) {
          alert('Must Contain atleast one option')
          //instead of delete the option it will reset the one existing and clean its values.
          return {
            ...state,
             [action.payload.seltype]: {...state[action.payload.seltype], 
                          [state[action.payload.seltype].selected] : {
                            ...state[action.payload.seltype][state[action.payload.seltype].selected],
                            options: {...state[action.payload.seltype][state[action.payload.seltype].selected].options,
                                      [opNum[0]] : {...SELECTORSTATE['SELECTORSTATE'][action.payload.seltype][action.payload.seltype.concat('0')].options[0]}
                              }
                         }
        }
        }}
       let newNumbering =  opNum.filter((item,idx)=> {
          let keep = false;
          console.log(action.payload)
          console.log(item)
          if (item !== action.payload.idx) {
            console.log('keep')
            keep = true;
          }
          console.log('dont keep')
          return keep
        })
        console.log(state[action.payload.seltype][state[action.payload.seltype].selected].options[action.payload.idx])
        delete state[action.payload.seltype][state[action.payload.seltype].selected].options[action.payload.idx]
        return {
          ...state,
          [action.payload.seltype]: {...state[action.payload.seltype], [state[action.payload.seltype].selected] : {...state[action.payload.seltype][state[action.payload.seltype].selected] , 
            optionsNumbering: newNumbering}
            }
          };

      case actionTypes.INPUT_CHANGE:
            console.log(action)
            console.log(state)
          if (action.payload.optionIdx != null) {
            return {
              ...state,
              [action.payload.seltype]: {...state[action.payload.seltype], [state[action.payload.seltype].selected] : {...state[action.payload.seltype][state[action.payload.seltype].selected] , 
                                                                    [action.payload.inputSource]: {...state[action.payload.seltype][state[action.payload.seltype].selected][action.payload.inputSource], 
                                                                    [action.payload.optionIdx] : {...state[action.payload.seltype][state[action.payload.seltype].selected][action.payload.inputSource][action.payload.optionIdx],
                                                                      [action.payload.inputData.name]: action.payload.inputData.value} }}
                                                                    }
                                                                     
              };
          }
          else {
            return {
              ...state,
              [action.payload.seltype]: {...state[action.payload.seltype], [state[action.payload.seltype].selected] : {...state[action.payload.seltype][state[action.payload.seltype].selected] , 
                                                                    [action.payload.inputSource]: {...state[action.payload.seltype][state[action.payload.seltype].selected][action.payload.inputSource], 
                                                                      [action.payload.inputData.name]: action.payload.inputData.value} }}
                                                                     
              };
          }          
      
      case actionTypes.SUBMIT:

          //dynamically get the correct source function to the specified selector type.
          let srcFn = state[action.payload.seltype].selected.srcFn({...state[action.payload.seltype][state[action.payload.seltype].selected]});
          return {
            ...state,
            [action.payload.seltype]: {...state[action.payload.seltype], 
                                  [state[action.payload.seltype].selected] : 
                                      {...state[action.payload.seltype][state[action.payload.seltype].selected] ,
                                       html : srcFn() }
            }
          }
      //test
      case actionTypes.ROUTEPATH:
            return {
              ...state,
              routePath: action.payload
            }
      default:
        return state;
    }
  };