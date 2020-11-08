import * as naming from '../layout/naming';

export const SELECTORSTATE = { 
    [naming.PANELSTACK] : {
      selectorsNumbering: [0],
      selected: naming.PANELSTACK.concat('0'),
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
    }      
};