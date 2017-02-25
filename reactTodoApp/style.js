import {
  Dimensions
} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default {
    allTaskHeader:{
    paddingLeft: 10,
  },
  addNewTaskBtn:{
    width: 500,
  },
  row:{
    flexDirection: 'row',
    padding: 10,
    paddingRight: 10,
    backgroundColor: '#F6F6F6',
  },
   text: {
    flex: 1,
    lineHeight: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    alignSelf: 'stretch',
    width: width,
    paddingBottom: 10
  }
}