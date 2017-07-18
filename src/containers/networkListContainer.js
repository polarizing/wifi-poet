import { connect } from 'react-redux';
import NetworkList from '../components/NetworkList.jsx';
import { getNetworks } from '../actions/networks';
import { watchNetworksChangedEvent } from '../actions/networks';

function mapStateToProps(state) {
	return {
		networks: state.network.items,
		live: state.network.live,
	}
}

function mapDispatchToProps(dispatch) {
	watchNetworksChangedEvent(dispatch);
	return {
		onGetNetworks: () => dispatch( getNetworks() ),
	};
}

const networkListContainer = connect(mapStateToProps, mapDispatchToProps)(NetworkList);

export default networkListContainer;