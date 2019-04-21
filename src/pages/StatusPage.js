import React, { Component } from 'react';
import { View, Alert, ListView, ActivityIndicator, AsyncStorage } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Right, Icon, Text, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import TimerMixin from 'react-timer-mixin';
export default class StatusPage extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      tcno: params.tcno,
      chooseView_OF: false,
      chooseView_SF: false,
      chooseView_OT: false,
      chooseView_ST: false,
      isLoading: true,
      showView: false,
      showSpinner: true,
    }
  }
  componentWillMount() {
    /*this.getStatus();*/
  }
  componentDidMount() {
    mixins: [TimerMixin]
    setTimeout(()=>{
      this.setState({
        showView: true,
        showSpinner: false,
      });
    }, 5000);
  }
  getTcno = () =>{
      try {
        AsyncStorage.getItem("tcno").then((value) => {
          this.setState({"tcno": value});
        }).done();
      }
      catch (error) {
      }
  };
  async getStatus() {
    this.getTcno();
    try {
      await fetch('http://denemebm.16mb.com/deneme/laststtmobiljson.php',{
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
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          dataSource: ds.cloneWithRows(cevapJson),
          isLoading: false,
        })
      })
    }
    catch(error) {
      console.error(error);
    }
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
  spinnerHide = () =>{
      this.setState({spinner: false});
  };

  showView = () =>{
      this.setState({hideView: true});
  };
  chooseView_OT = (stt) =>{
    if(stt == 'okulda'){
      return true;
    }
    else {
      return false;
    }
  }
  chooseView_ST = (stt) =>{
    if(stt == 'serviste'){
      return true;
    }
    else {
      return false;
    }
  }
  chooseView_OF = (stt) =>{
    if(stt == 'okulda değil'){
      return true;
    }
    else {
      return false;
    }
  }
  chooseView_SF = (stt) =>{
    if(stt == 'serviste değil'){
      return true;
    }
    else {
      return false;
    }
  }
  render() {
    if (this.state.isLoading) {
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
                <Icon name='exit' style={{fontSize: 24, color:'#fff'}}/>
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
            <Spinner color='#3d9dd7' />
          </Content>
        </Container>
      );
    }
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
              <Icon name='exit' style={{fontSize: 24}}/>
            </Button>
          </Right>
        </Header>
        <Content
          contentContainerStyle={{
						alignItems: 'center',
						flex: 1,
						justifyContent: 'center',
            marginTop: 2,
            marginBottom: 2,
					}}
        >
          <View style={this.state.showSpinner ? false : {display: 'none'}}>
            <View style={{zIndex: 99, position: 'absolute', alignSelf: 'center', marginTop: '50%'}}>
              <Spinner color='#3d9dd7'/>
            </View>
          </View>
          <View style={this.state.showView ? false :{opacity: 0}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                <View>
                  <View style={this.chooseView_OT(rowData.durum) ? false :{display: 'none'}}>
                    <View style={{minWidth: '100%', backgroundColor: '#3ac069', marginTop: 1, marginBottom: 1, flex: 1, justifyContent: 'space-around', flexDirection: 'row', alignItems:'center'}}>
                      <Icon name="home" style={{color: '#fff'}}/>
                      <Text style={{color: '#fff', width: '27%'}}>Okulda</Text>
                      <Text style={{color: '#fff', width: '23%'}}>{rowData.tarih}</Text>
                      <Text style={{color: '#fff', width: '12%'}}>{rowData.saat}</Text>
                    </View>
                  </View>
                  <View style={this.chooseView_OF(rowData.durum) ? false :{display: 'none'}}>
                    <View style={{minWidth: '100%', backgroundColor: '#fa5b31', marginTop: 1, marginBottom: 1, flex: 1, justifyContent: 'space-around', flexDirection: 'row', alignItems:'center'}}>
                      <Icon name="home" style={{color: '#fff'}}/>
                      <Text style={{color: '#fff', width: '27%'}}>Okulda Değil</Text>
                      <Text style={{color: '#fff', width: '23%'}}>{rowData.tarih}</Text>
                      <Text style={{color: '#fff', width: '12%'}}>{rowData.saat}</Text>
                    </View>
                  </View>
                  <View style={this.chooseView_ST(rowData.durum) ? false :{display: 'none'}}>
                    <View style={{minWidth: '100%', backgroundColor: '#3ac069', marginTop: 1, marginBottom: 1, flex: 1, justifyContent: 'space-around', flexDirection: 'row', alignItems:'center'}}>
                      <Icon name="bus" style={{color: '#fff'}}/>
                      <Text style={{color: '#fff', width: '27%'}}>Serviste</Text>
                      <Text style={{color: '#fff', width: '23%'}}>{rowData.tarih}</Text>
                      <Text style={{color: '#fff', width: '12%'}}>{rowData.saat}</Text>
                    </View>
                  </View>
                  <View style={this.chooseView_SF(rowData.durum) ? false :{display: 'none'}}>
                    <View style={{minWidth: '100%', backgroundColor: '#fa5b31', marginTop: 1, marginBottom: 1, flex: 1, justifyContent: 'space-around', flexDirection: 'row', alignItems:'center'}}>
                      <Icon name="bus" style={{color: '#fff'}}/>
                      <Text style={{color: '#fff', width: '27%'}}>Serviste Değil</Text>
                      <Text style={{color: '#fff', width: '23%'}}>{rowData.tarih}</Text>
                      <Text style={{color: '#fff', width: '12%'}}>{rowData.saat}</Text>
                    </View>
                  </View>
                </View>
              }
            />
          </View>
        </Content>
      </Container>
    );
  }
}
