import React, { Component } from 'react';
import { Image, View, Alert, Keyboard, AsyncStorage } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Text, Form, Label, Input, Item, H1, H2, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import TimerMixin from 'react-timer-mixin';
export default class LoginPage extends Component {
  constructor(props) {
		super(props)
		this.state = {
			tcno: '',
			sirano: '',
			spinner: false,
      viewDisplay: true,
		}
	}
  loginFunction = () => {
    mixins: [TimerMixin]
    Keyboard.dismiss();
    const { tcno }  = this.state ;
		const { sirano }  = this.state ;
    this.setState({spinner: true});
    this.setState({viewDisplay: false});
    setTimeout(()=>{
      try {
        fetch('http://denemebm.16mb.com/deneme/login.php', {
    			method: 'POST',
    			headers: {
    				'Accept': 'application/json',
    				'Content-Type': 'application/json',
    			},
    			body: JSON.stringify({
    				tcno: tcno,
    				sirano: sirano,
    			})
    		})
    		.then((cevap) => cevap.json())
    		.then((cevapJson) => {
    			if(cevapJson === 'true'){
    				this.setState({spinner: false});
            this.setState({viewDisplay: true});
            this.saveTcno(tcno);
            this.saveSirano(sirano);
    				Actions.tabs({type: 'reset'});
    				Keyboard.dismiss();
    			}
    			else{
    				Keyboard.dismiss();
    				Alert.alert('Giriş Başarısız', 'TC Kimlik Numarası ya da Aile Sıra Numarası yanlış. Lütfen tekrar deneyiniz.');
    				this.setState({spinner: false});
            this.setState({viewDisplay: true});
    			}
    		})
      } catch (error) {
        console.error(error);
      }
    }, 1000);
  }
  saveTcno(tcno) {
        AsyncStorage.setItem("tcno", tcno);
        this.setState({"tcno": tcno});
  }
  saveSirano(sirano) {
        AsyncStorage.setItem("sirano", sirano);
        this.setState({"sirano": sirano});
  }
  render() {
    return (
      <Container
        style={{backgroundColor: '#3d9dd7'}}
      >
        <Header
					androidStatusBarColor="#3d9dd7"
					style={{
						display: 'none'
					}}
				/>
        <Content
          contentContainerStyle={{
						alignItems: 'center',
						flex: 1,
						justifyContent: 'center',
					}}
        >
          <View
            style={this.state.spinner ? false : {display: 'none'}}
          >
            <View style={{alignSelf: 'center'}}>
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
              <Spinner color='#fff'/>
            </View>
          </View>
          <View
            style={this.state.viewDisplay ? false : {display: 'none'}}
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
            <H1
  						style={{
  							padding: 3,
                marginTop: 5,
  							fontWeight: 'bold',
  							textAlign: 'center',
                color:'#fff',
  						}}
  					>
  						E-TAKİP
  					</H1>
            <H2
  						style={{
  							padding: 2,
  							textAlign: 'center',
                color:'#fff',
  						}}
  					>
  						Giriş
  					</H2>
            <Form
              style={{minWidth: '100%'}}
            >
              <Item floatingLabel last
                style={{borderBottomColor: '#fff'}}
              >
                <Label style={{color:'#fff', padding: 5}}>TC Kimlik Numarası</Label>
                <Input
                  keyboardType="numeric"
  								maxLength = {11}
  								onChangeText={tcno => this.setState({tcno: tcno})}
                  style={{color: '#fff'}}
                />
              </Item>
              <Item floatingLabel last
                style={{borderBottomColor: '#fff'}}
              >
                <Label style={{color:'#fff', padding: 5}}>Aile Sıra Numarası</Label>
                <Input
  								keyboardType="numeric"
  								maxLength = {5}
  								onChangeText={sirano => this.setState({sirano: sirano})}
                  style={{color: '#fff'}}
                />
              </Item>
            </Form>
          </View>
        </Content>
        <View
          style={this.state.viewDisplay ? false : {display: 'none'}}
        >
          <Footer>
            <FooterTab
              style={{backgroundColor:'#3d9dd7'}}
            >
                <Button onPress={this.loginFunction}>
                  <Text
                    style={{color: '#fff', fontSize: 24, minWidth: '100%', textAlign: 'center', fontWeight: 'bold', padding: 10, marginTop: 12}}
                  >
                    DEVAM ET
                  </Text>
                </Button>
            </FooterTab>
          </Footer>
        </View>
      </Container>
    );
  }
}
