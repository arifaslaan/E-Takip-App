import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import StarterPage from './src/pages/StarterPage';
import LoginPage from './src/pages/LoginPage';
import StatuPage from './src/pages/StatuPage';
import StatusPage from './src/pages/StatusPage';
import { Scene,Router,Actions,Stack,Tabs } from 'react-native-router-flux';
import { Icon } from 'native-base';
export default class App extends Component {

	render() {
		const TabIcon = ({ selected, title }) => {
			switch (title) {
				case 'Güncel Durum':
					return (
						<Icon name="eye" style={{color: "#fff"}} />
					)
				case 'Son Hareketler':
					return (
						<Icon name="list" style={{color: "#fff"}} />
					)
			}
		}
		const scenes = Actions.create(
			<Scene key="root">
		    <Scene
          hideNavBar={true}
          key="StarterPage"
          component={StarterPage}
        />
		    <Scene
					hideNavBar={true}
					key="LoginPage"
					component={LoginPage}
				/>
				<Stack key="tabs">
	        <Tabs
						key="tabbar"
	          swipeEnabled={false}
	          activeBackgroundColor="rgba(60, 156, 215, 0.9)"
	          inactiveBackgroundColor="#3d9dd7"
						activeTintColor="#fff"
						inactiveTintColor="#fff"
						labelStyle={{
							fontSize: 14,
						}}
						tabBarStyle={{
							height: 60
						}}
						tabBarPosition="bottom"
	        >

		  		    <Scene
								icon={TabIcon}
								hideNavBar={true}
								title="Güncel Durum"
								key="StatuPage"
								component={StatuPage}
							/>
		          <Scene
								icon={TabIcon}
								hideNavBar={true}
								title="Son Hareketler"
								key="StatusPage"
								component={StatusPage}
							/>

	        </Tabs>
				</Stack>
			</Scene>
		);

		return <Router scenes={scenes}/>
	}
}

AppRegistry.registerComponent('App', () => App);
