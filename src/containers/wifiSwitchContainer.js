import { connect } from 'react-redux';
import WifiSwitch from '../components/WifiSwitch.jsx';

function mapStateToProps(state) {
	console.log(state);
	return {
		user: state.user.activeUser.data,
	}
}

function mapDispatchToProps(dispatch) {
	return {

	}
}

const wifiSwitchContainer = connect(mapStateToProps, mapDispatchToProps)(WifiSwitch);

export default wifiSwitchContainer;