import * as naming from '../layout/naming';
import PanelStackSRC  from '../components/selectors/panelStack/panelStackSRC';//i should make a file with all srchtml fn's

export const SELECTORSTATE = { 
    routePath: 'Home',
    [naming.PANELSTACK] : {
      inputTypesMain: ['text','default','mask','subselector'],
      inputTypesOptions:  ['alias','affectedTarget'],
      selectorsNumbering: [0],
      selected: naming.PANELSTACK.concat('0'),
      srcFn: PanelStackSRC,
      [naming.PANELSTACK.concat('0')]: {
          optionsNumbering:[0],
          maindef : {
              id: 'id',
              linker: '',
              text: '',
              default: '',
              mask: '',
              subselector: ''
          },
          options : {
            0 : {
              idx: '',
              affectedTarget: '', 
              alias : '',
            }
          },
          html: ''
      } 
    } ,
    [naming.SHEETPANEL] : { 
      inputTypesMain: ['text'],
      inputTypesOptions:  ['alias','affectedTarget'],
      selectorsNumbering: [0],
      selected: naming.SHEETPANEL.concat('0'),
      srcFn: PanelStackSRC,
      [naming.SHEETPANEL.concat('0')]: {
        optionsNumbering:[0],
        maindef : {
            id: 'id',
            linker: '',
            text: '',
            default: '',
            mask: '',
            subselector: ''
        },
        options : {
          0 : {
            idx: '',
            affectedTarget: '', 
            alias : '',
          }
        },
        html: ''
    } 
    }
};