import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import TimerMixin from 'react-timer-mixin';

export default class StarterPage extends Component {
  componentWillMount(){
    clearInterval(this._interval);
  }
  componentDidMount() {
    mixins: [TimerMixin]
    setTimeout(()=>{
      this.controlFunction();
    }, 1200);
  }
  controlFunction = () =>{
      try {
        AsyncStorage.getItem("tcno").then((value) => {
          this.setState({"tcno": value});
          if(this.state.tcno !== null){
            Actions.tabs({type:'reset'})
          }
          else{
            Actions.LoginPage({type: 'reset'})
          }
        }).done();
      }
      catch (error) {
      }
  }
  render() {
    return (
      <Container
        style={{
          backgroundColor: '#3d9dd7'
        }}
      >
        <Header
					androidStatusBarColor="#3d9dd7"
					style={{
						display: 'none'
					}}
				/>
        <Content
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
              style={{
                width: 102,
                height: 102,
                alignSelf: 'center'
              }}
              source={
                require('../img/logo.png'
              )}
          />
          <Spinner color='white' />
        </Content>
      </Container>
    );
  }
}
