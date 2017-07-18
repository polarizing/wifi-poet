import { connect } from 'react-redux';
import NetworkItem from '../components/NetworkItem.jsx';
import { createNetworkHistoryItem } from '../actions/networks';
import { updateNetwork } from '../actions/networks';
import { watchNetworksChangedEvent } from '../actions/networks';

function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {
	return {
		onCreateNetworkHistoryItem: ( networkId, data ) => dispatch( createNetworkHistoryItem( networkId, data ) ),
		onUpdateNetwork: ( networkId, data ) => dispatch( updateNetwork( networkId, data) )
	};
}

const networkItemContainer = connect(mapStateToProps, mapDispatchToProps)(NetworkItem);

export default networkItemContainer;