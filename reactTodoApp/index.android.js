import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  ListView,
  Dimensions
} from 'react-native';
import { 
  Container, 
  Header, 
  Button,
  Body, 
  Left, 
  Right, 
  Title, 
  Content, 
  Footer, 
  Text, 
  Item, 
  Form, 
  Label, 
  Input, 
  H1,
  H2, 
  H3, 
  List,
  ListItem, 
  Radio,
  FooterTab
   } from 'native-base';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';

var Firebase = require('firebase');

export default class reactTodoApp extends React.Component{
  constructor(props) {
    super(props);
    var myFirebaseRef = new Firebase('https://reacttodoapp-197df.firebaseio.com');
    this.itemsRef = myFirebaseRef.child('items');

    this.state = {
      newTodo: '',
      status: '',
      isCompleted: false,
      todoSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2})
    };

    this.items = [];
    
  }

  componentDidMount() {
    //when a todo is added
    this.itemsRef.on('child_added', (dataSnapshot) => {
      this.items.push({id: dataSnapshot.key(), text: dataSnapshot.val()});
      this.setState({
        todoSource: this.state.todoSource.cloneWithRows(this.items)
      });
    });

    //when a todo is removed
    this.itemsRef.on('child_removed', (dataSnapshot) => {
      this.items = this.items.filter((x) => x.id !== dataSnapshot.key());
      this.setState({
        todoSource: this.state.todoSource.cloneWithRows(this.items)
      });
    });

    //when status is changed/updated
    this.itemsRef.on('child_changed', (dataSnapshot) => {
      var db = dataSnapshot.val();
      var updatedStatus = db.status;
      this.setState({
        status: this.state.status
      });
    });
  }

  addItem(){
    if (this.state.newTodo != ''){
      this.itemsRef.push({
        todo: this.state.newTodo,
        status: 'new'
      });
      this.setState({
        newTodo : ''
      });
    }
  }

  deleteItem(rowData){
    this.itemsRef.child(rowData.id).remove();
  }

  isCompleted(rowData){
    // if (this.state.status != 'new'){
      this.itemsRef.child(rowData.id).update({
        status: 'completed'
      });
      this.setState({
        isCompleted: true
      })
    // }
  }

  render() {
    return (
        <Container>
        <Header>
          <Body>
            <Title>React Todo App</Title>
          </Body>
        </Header>
        <Content padder>
          <ListItem itemHeader first><Text>All Tasks</Text></ListItem>
          <ListView
          dataSource={this.state.todoSource}
          renderRow={this.renderRow.bind(this)}
        />
        </Content>
        <Form>
          <Item floatingLabel>
            <Label>Task</Label>
            <Input onChangeText={(text) => this.setState({newTodo: text})} value={this.state.newTodo}/>
          </Item>
          <Button onPress={ () => this.addItem()} style={styles.addNewTaskBtn}>
              <Text>Add New Task</Text>
            </Button>
        </Form>
      </Container>
    );
  }

  renderRow(rowData) {
    return (
      <ListItem>
        <Body><Text>{rowData.text.todo}</Text></Body>
        <Right>
          <Icon name="check" size={20} color={this.state.isCompleted ? '#1DA664' : '#DE5347'} onPress={() => this.isCompleted(rowData)} isCompleted={this.state.isCompleted}/>
        </Right>
        <Right>
          <Icon name="trash-o" size={20} color="#900" onPress={() => this.deleteItem(rowData)}/>
        </Right>
      </ListItem>
    );
  }
}

AppRegistry.registerComponent('reactTodoApp', () => reactTodoApp);