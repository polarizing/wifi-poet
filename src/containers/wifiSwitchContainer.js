import { connect } from 'react-redux';
import WifiSwitch from '../components/WifiSwitch.jsx';
import { getUser } from '../actions/users';

function mapStateToProps(state) {
	return {
		user: state.activeUser,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onGetUser: (userId) => dispatch( getUser(userId) ),
	};
}

const wifiSwitchContainer = connect(mapStateToProps, mapDispatchToProps)(WifiSwitch);

export default wifiSwitchContainer;