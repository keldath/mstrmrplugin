import * as naming from '../layout/naming';
import PanelStackSRC  from '../components/selectors/panelStack/panelStackSRC';//i should make a file with all srchtml fn's
import sheetPanelSRC  from '../components/selectors/sheetPanel/sheetPanelSRC';//i should make a file with all srchtml fn's
import viewFiltersSRC from '../components/selectors/viewFilters/viewFiltersSRC';//i should make a file with all srchtml fn's
import dynamicTextSRC from '../components/selectors/dynamicText/dynamicTextSRC';//i should make a file with all srchtml fn's


const geneRateID = (str) => {
  //creates a random ID for a given selector
  return (
    str.concat(String(Math.floor((Math.random() *100 -1))).concat(Math.random().toString(36).substring(2,10)))
  )
}

export const SELECTORSTATE = { 
    routePath: 'Home',
    [naming.PANELSTACK] : {
      inputTypesMain: ['text','default','mask','subselector'],
      inputTypesOptions:  ['alias','Target'],
      inputTypesOptionsDesc: [],
      selectorsNumbering: [0],
      selected: naming.PANELSTACK.concat('0'),
      srcFn: PanelStackSRC,
      [naming.PANELSTACK.concat('0')]: {
          optionsNumbering:[0],
          maindef : {
              id: geneRateID(naming.VIEWFILTER.concat('0')),
              linker: '1',
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
      inputTypesMain: ['text','default'],
      inputTypesOptions:  ['alias','sheet Idx', 'panel Idx','type'],
      inputTypesOptionsDesc: [],
      selectorsNumbering: [0],
      selected: naming.SHEETPANEL.concat('0'),
      srcFn: sheetPanelSRC,
      [naming.SHEETPANEL.concat('0')]: {
        optionsNumbering:[0],
        maindef : {
            linker: '1',
            text: '',
            default: '',
            type: ''
        },
        options : {
          0 : {
            idx: '',
            alias : '',
            sheetIdx: '', 
            panelIdx: ''
          }
        },
        html: ''
    } 
    },
    [naming.VIEWFILTER] : { 
      inputTypesMain: ['linkedto','linked','affectedTraget','mask','subselector','fakeheadline','text','default'],
      inputTypesOptions:  ['type','alias','idx','iname','linkedalias','subsalias'],
      // inputTypesOptionsDesc: [],
      inputTypesSubOptions: ['iname','condIdx','objectID','datasetID','basedOn','topx','operator','selectTab','parentselectrOp','filterOn'],
      selectorsNumbering: [0],
      selected: naming.VIEWFILTER.concat('0'),
      srcFn: viewFiltersSRC,
      [naming.VIEWFILTER.concat('0')]: {
        optionsNumbering:[0],
        maindef : {
          id: geneRateID(naming.VIEWFILTER.concat('0-')),
          linker: '1',// uses to help chain selectors.
          text: 'View Filter:', //text before/outside the selector button
          default: 'Oprion 0', //name oof the button default selection
          linked: '', ////will hold the linker of the parent if theres a chain
          linkedto: '', //will hold the parent name selector if theres a chain
          affectedTraget: '', //the visualizaion headline to affect
          mask: '1', //hide the changes with a mask
          subselector: '',//trigger selector chaining
          fakeheadline: 'none',//replace the headline of a text box - use a dynamic text selector with chain - it works but older design.
        },
        options : {
          0 : {
            idx: '0',//use the input to generate according to he option idx when adding a new
            alias : 'globals/any', //the name that is assosiated with a parent selector if any
            type: 'global/preset',//should be contsant - it mostly be used when this is taken into chaining selectors (subselector)
            iname: 'globals/any', //name of the option 
            linkedalias: 'linkedalias',
            subsalias: 'subsalias',
            optionsSubNumbering:[0],
            subOptions : {
              0 : {
                condIdx: '0', //same idx for another following condition will act as alternatice condition in case this one didnt work(dynamic conditioning)
                iname: 'attr,0/mstr,0/any', //this will be matched with the parent selector if chaining was done. it will look for the same name and then click it.
                objectID : 'ObjectId', // the id of the attribute/metric the condition should be set
                datasetID: 'DataSetId', //id of the data set that contains the mtr / attr
                basedOn: '', //can be used to grab by nmae an item from the chart it self.//not tested
                topx: '', //used to filter top x values - need to check i think its not working well - use selectTab ranking instead.
                operator: 'In/Is Null/Not[..]/Between', //this is the operator for how to choose the values  - default is ID **one day ill do the list in list - they are complicated.
                selectTab: 'ID/Rank between highest', //how to set the values? with an in operator or not in for example. for metrics - this will be the operator type, betwwen, equal, and su
                parentselectrOp: 'selectorId,seelctorslinker,optionAlias,show/hide/all', //show or hide the option dependant on another selectors btn
                filterOn: 'mtr-attr value/for rank- 0:25', //will hold the values to filter , comma seperated values. (if null then its probably a topx) for metrics => as a separator for 2 options - between for example, 0:5
              }
            },
          }
        },
        html: ''
    } 
    },
    [naming.DYNAMICTEXT] : { 
      inputTypesMain: ['id','text','default','affectedTraget','mask','subselector'],
      inputTypesOptions:  ['alias','subalias','text',],
      // inputTypesOptionsDesc: [],
      selectorsNumbering: [0],
      selected: naming.DYNAMICTEXT.concat('0'),
      srcFn: dynamicTextSRC,
      [naming.DYNAMICTEXT.concat('0')]: {
        optionsNumbering:[0],
        maindef : {
          id: geneRateID(naming.DYNAMICTEXT.concat('0-')),
          text: 'Dynamic Text:', //text before/outside the selector button
          default: 'Oprion 0', //name of the button default selection
          affectedTraget: '', //the visualizaion headline to affect
          mask: '1', //hide the changes with a mask
          subselector: '',//trigger selector chaining
        },
        options : {
          0 : {
            idx: '0',
            alias : '',
            subalias: '',
            text: '', 
            },
          },
        html: ''
        },
    }
};

