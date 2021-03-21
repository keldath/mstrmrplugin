// REDUCERS

import * as actionTypes from './actions';
import * as SELECTORSTATE from './stateTemplate';

//need to do lazy loading for each selector
//import PanelStackSRC  from '../components/selectors/panelStack/panelStackSRC';//i should make a file with all srchtml fn's
//import * as naming from '../layout/naming';

/*

 todo : break the reducers into seprate - combinereducers() later on.

*/
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

    const getNextSubOptionIdx = (optionIdx) => {
     // debugger;
      let numbering = state[action.payload.seltype][state[action.payload.seltype].selected].options[optionIdx].optionsSubNumbering;
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
        let defaultoption = Object.keys(state[action.payload.seltype][state[action.payload.seltype].selected].options)[0]
        if (opNum.length === 1) {
          alert('Must Contain atleast one option')
          //instead of delete the option it will reset the one existing and clean its values.
          return {
            ...state,
             [action.payload.seltype]: {...state[action.payload.seltype],
                          selectedOption: defaultoption,
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
          if (item !== action.payload.idx) {
            keep = true;
          }
          return keep
        })
        delete state[action.payload.seltype][state[action.payload.seltype].selected].options[action.payload.idx]
        let optionsList = state[action.payload.seltype][state[action.payload.seltype].selected].options
        return {
          ...state,
          [action.payload.seltype]: {...state[action.payload.seltype], [state[action.payload.seltype].selected] : {...state[action.payload.seltype][state[action.payload.seltype].selected] , 
            optionsNumbering: newNumbering},
            selectedOption: Object.keys(optionsList)[0]
            }
          };
      
          case actionTypes.ADD_SUBOPTION:
            let newSONum = getNextSubOptionIdx(action.payload.optionIdx);
             return {
              ...state,
               [action.payload.seltype]: {...state[action.payload.seltype], 
                            [action.payload.selected] : {
                              ...state[action.payload.seltype][action.payload.selected],
                              options:  {...state[action.payload.seltype][action.payload.selected].options,
                                        [action.payload.optionIdx] : 
                                         { ...state[action.payload.seltype][action.payload.selected].options[action.payload.optionIdx],
                                        optionsSubNumbering: [...state[action.payload.seltype][action.payload.selected].options[action.payload.optionIdx].optionsSubNumbering, newSONum],
                                        subOptions :
                                          {...state[action.payload.seltype][action.payload.selected].options[action.payload.optionIdx].subOptions,
                                           [newSONum] : {...SELECTORSTATE['SELECTORSTATE'][action.payload.seltype][action.payload.seltype.concat('0')].options[0].subOptions[0]}
                                          }
                                          }
                              },
                          },
              }
            }
     
          case actionTypes.REMOVE_SUBOPTION:

            let sopNum = state[action.payload.seltype][state[action.payload.seltype].selected].options[action.payload.optionIdx].optionsSubNumbering;
              if (sopNum.length === 1) {
                alert('Must Contain atleast one sub option')
                return {
                  ...state,
                   [action.payload.seltype]: {...state[action.payload.seltype], 
                                [state[action.payload.seltype].selected] : {
                                  ...state[action.payload.seltype][state[action.payload.seltype].selected],
                                  options: {...state[action.payload.seltype][state[action.payload.seltype].selected].options,
                                            [action.payload.optionIdx] : {

                                              ...state[action.payload.seltype][state[action.payload.seltype].selected].options[action.payload.optionIdx] ,
                                              subOptions :
                                             { [sopNum] : {...SELECTORSTATE['SELECTORSTATE'][action.payload.seltype][action.payload.seltype.concat('0')].options[0].subOptions[0]}
                                              }
                                              }
                                            }
                                    }
                               }
              }
              };
             let newSubNumbering =  sopNum.filter((item,idx)=> {
                let keep = false;
                if (item !== action.payload.subOptionIdx) {
                  keep = true;
                }
                return keep
              })
              delete state[action.payload.seltype][state[action.payload.seltype].selected].options[action.payload.optionIdx].subOptions[action.payload.subOptionIdx]
              return {
                ...state,
                 [action.payload.seltype]: {...state[action.payload.seltype], 
                              [state[action.payload.seltype].selected] : {
                                ...state[action.payload.seltype][state[action.payload.seltype].selected],
                                options: {...state[action.payload.seltype][state[action.payload.seltype].selected].options,
                                          [action.payload.optionIdx] : {
                                            ...state[action.payload.seltype][state[action.payload.seltype].selected].options[action.payload.optionIdx] ,
                                            optionsSubNumbering: newSubNumbering
                                          }
                                  }
                             }
            }
            };
                  
      case actionTypes.INPUT_CHANGE:
      //  debugger;
          if (action.payload.optionIdx !== null && action.payload.subOptionIdx === null) {
            return {
              ...state,
              [action.payload.seltype]: {...state[action.payload.seltype], [state[action.payload.seltype].selected] : {...state[action.payload.seltype][state[action.payload.seltype].selected] , 
                                                                    [action.payload.inputSource]: {...state[action.payload.seltype][state[action.payload.seltype].selected][action.payload.inputSource], 
                                                                    [action.payload.optionIdx] : {...state[action.payload.seltype][state[action.payload.seltype].selected][action.payload.inputSource][action.payload.optionIdx],
                                                                      [action.payload.inputData.name]: action.payload.inputData.value} }}
                                                                    }
                                                                     
              };
          }
          else if (action.payload.optionIdx !== null && action.payload.subOptionIdx !== null) {
            return {
                    ...state,
                    [action.payload.seltype]: {...state[action.payload.seltype], [state[action.payload.seltype].selected] : {
                                                                ...state[action.payload.seltype][state[action.payload.seltype].selected] , 
                                                                options: { 
                                                                    ...state[action.payload.seltype][state[action.payload.seltype].selected].options, 
                                                                    [action.payload.optionIdx] : {
                                                                                ...state[action.payload.seltype][state[action.payload.seltype].selected].options[action.payload.optionIdx],
                                                                                subOptions: {
                                                                                   ...state[action.payload.seltype][state[action.payload.seltype].selected].options[action.payload.optionIdx].subOptions,
                                                                                   [action.payload.subOptionIdx] : {
                                                                                     ...state[action.payload.seltype][state[action.payload.seltype].selected].options[action.payload.optionIdx].subOptions[action.payload.subOptionIdx],
                                                                                     [action.payload.inputData.name] : action.payload.inputData.value} 
                                                                                }
                                                                              
                                                                          }
                                                                      }
                                                                }
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
      
      case  actionTypes.SELECTEDOPTION:
          console.log(action.payload)
          return {
            ...state,
            [action.payload.seltype]: {...state[action.payload.seltype], 
                                        selectedOption: action.payload.optionIdx
                                      }
                                                                   
            }; 
      case actionTypes.SUBMIT:

          //dynamically get the correct source function to the specified selector type.
          let srcFnout = state[action.payload.seltype].srcFn({...state[action.payload.seltype][state[action.payload.seltype].selected]});
          return {
            ...state,
            [action.payload.seltype]: {...state[action.payload.seltype], 
                                  [state[action.payload.seltype].selected] : 
                                      {...state[action.payload.seltype][state[action.payload.seltype].selected] ,
                                       html : srcFnout }
            }
          }
       default:
        return state;
    }
  };