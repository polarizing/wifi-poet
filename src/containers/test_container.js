import { connect } from 'react-redux';
import Test from '../components/Test.jsx';
import { getNetworks, addNetworkHistory } from '../actions/networks'

function mapStateToProps(state) {
	// console.log(state);
	return {
		networks: state.networks
	}
}

function mapDispatchToProps(dispatch) {
	// watchGuestAddedEvent(dispatch);
	return {
		onGetNetworks: () => dispatch( getNetworks() ),
		onAddNetworkHistory: (networkId, data) => dispatch( addNetworkHistory(networkId, data) )
	};
}

const testContainer = connect(mapStateToProps, mapDispatchToProps)(Test);

export default testContainer;