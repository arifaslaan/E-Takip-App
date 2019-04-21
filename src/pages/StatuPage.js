import React, { Component } from 'react';
import { View, Alert, AsyncStorage } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Right, Icon, Text, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class StatuPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
        cevap: '',
        hideSpinner: false,
        chooseView_OF: false,
        chooseView_SF: false,
        chooseView_OT: false,
        chooseView_ST: false,
        showView: true,
    }
  }
  chooseView = () => {
    var durum = _.toString(this.state.cevap.durum);
    if(durum === "okulda değil"){
        this.setState({chooseView_OF: true});
    }
    if(durum === "serviste değil"){
        this.setState({chooseView_SF: true});
    }
    if(durum === "okulda"){
        this.setState({chooseView_OT: true});
    }
    if(durum === "serviste"){
        this.setState({chooseView_ST: true});
    }
  }
  hideSpinner = () => {
    this.setState({hideSpinner: false});
  };

  showView = () => {
    this.setState({showView: true});
  };
  async getTcno(){
    try {
      const value = await AsyncStorage.getItem('tcno');
        if (value !== null){
          this.setState({"tcno": value});
          console.log(this.state.tcno);
        }
    } catch (error) {

    }
  }
  async getStatus(){
    this.setState({showView: false});
    this.setState({hideSpinner: true});
    try {
      await fetch('http://denemebm.16mb.com/deneme/status.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tcno: 15443519316,
        })
      })
      .then((cevap) => cevap.json())
      .then((cevapJson) => {
          this.setState({cevap: cevapJson});
      })
      .then(this.chooseView)
      .then(this.hideSpinner)
      .then(this.showView)
    }
    catch(error){
      console.log(error);
    }
  }
  componentWillMount(){
    this.getTcno();
    this.getStatus();
    clearInterval(this._interval);
  }
  componentDidUpdate() {
    clearInterval(this._interval);
    this._interval = setInterval(()=>{
      this.getStatus();
    }, 60000);
    clearInterval(this._interval);
  }
  logOut = () =>{
    Alert.alert(
      'Uyarı!',
      'Çıkış yapmak istediğinize emin misiniz?',
      [
        {text: 'Hayır'},
        {text: 'Evet', onPress: () => {this.logoutButtonClick()}},
      ],
      { cancelable: false }
    )
  }
  logoutButtonClick = () =>{
    AsyncStorage.removeItem("tcno");
    AsyncStorage.removeItem("sirano");
    Actions.StarterPage({type: 'reset'});
  }
  render() {
    var cevapObj = this.state.cevap;
    return (
      <Container
        style={{backgroundColor: '#fff'}}
      >
        <Header
          androidStatusBarColor="#3d9dd7"
          style={{backgroundColor: '#3d9dd7'}}
        >
          <Right>
            <Button transparent onPress={this.logOut}>
              <Icon name='exit' style={{fontSize: 24, color: "#fff"}}/>
            </Button>
          </Right>
        </Header>
        <Content
          contentContainerStyle={{
						alignItems: 'center',
						flex: 1,
						justifyContent: 'center',
					}}
        >
          <View
            style={this.state.hideSpinner ? false : {display: 'none'}}
          >
            <Spinner color='#3d9dd7'/>
          </View>
          <View
            style={this.state.showView ? false : {display: 'none'}}
          >
            <Text
              style={{color: '#3d9dd7', fontSize: 24, lineHeight: 32, textAlign: 'center'}}
            >
              Velisi olduğunuz,
            </Text>
            <Text
              style={{color: '#3d9dd7', fontSize: 30, fontWeight: 'bold', lineHeight: 32, textAlign: 'center'}}
            >
              {cevapObj.ad} {cevapObj.soyad}
            </Text>
            <Text
              style={{color: '#3d9dd7', fontSize: 24, fontWeight: 'bold', lineHeight: 32, textAlign: 'center'}}
            >
              {cevapObj.tarih}
            </Text>
            <Text
              style={{color: '#3d9dd7', fontSize: 24, fontWeight: 'bold', lineHeight: 32, textAlign: 'center'}}
            >
              {cevapObj.saat}
            </Text>
            <Text
              style={{color: '#3d9dd7', fontSize: 24, lineHeight: 32, textAlign: 'center'}}
            >
              tarihinden itibaren
            </Text>
            <View
              style={this.state.chooseView_OF ? false : {display: 'none'}}
            >
              <View style={{alignItems: 'center', backgroundColor: '#fa5b31', minWidth: '98%', borderRadius: 10}}>
                <Text
                  style={{color: '#fff', fontSize: 36, fontWeight: 'bold', padding: 2}}
                >
                  OKULDA DEĞİL
                </Text>
                <Icon name='alert' style={{color: '#fff', fontSize: 50, fontWeight: 'bold', padding: 2}}/>
              </View>
            </View>
            <View
              style={this.state.chooseView_SF ? false : {display: 'none'}}
            >
              <View style={{alignItems: 'center', backgroundColor: '#fa5b31', minWidth: '98%', borderRadius: 10}}>
                <Text
                  style={{color: '#fff', fontSize: 36, fontWeight: 'bold', padding: 2}}
                >
                  SERVİSTE DEĞİL
                </Text>
                <Icon name='alert' style={{color: '#fff', fontSize: 50, fontWeight: 'bold', padding: 2}}/>
              </View>
            </View>
            <View
              style={this.state.chooseView_OT ? false : {display: 'none'}}
            >
              <View style={{alignItems: 'center', backgroundColor: '#3ac069', minWidth: '98%', borderRadius: 10}}>
                <Text
                  style={{color: '#fff', fontSize: 36, fontWeight: 'bold', padding: 2}}
                >
                  OKULDA
                </Text>
                <Icon name='checkmark-circle' style={{color: '#fff', fontSize: 50, fontWeight: 'bold', padding: 2}}/>
              </View>
            </View>
            <View
              style={this.state.chooseView_ST ? false : {display: 'none'}}
            >
              <View style={{alignItems: 'center', backgroundColor: '#3ac069', minWidth: '98%', borderRadius: 10}}>
                <Text
                  style={{color: '#fff', fontSize: 36, fontWeight: 'bold', padding: 2}}
                >
                  SERVİSTE
                </Text>
                <Icon name='checkmark-circle' style={{color: '#fff', fontSize: 50, fontWeight: 'bold', padding: 2}}/>
              </View>
            </View>
          </View>
        </Content>
        <Text style={{textAlign: 'center', color: 'gray', marginBottom: 5}}>
          Bilgiler dakikada bir güncellenmektedir.
        </Text>
      </Container>
    );
  }
}
