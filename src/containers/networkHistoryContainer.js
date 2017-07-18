import { connect } from 'react-redux';
import NetworkHistory from '../components/NetworkHistory.jsx';
import { getNetworkHistoryItem } from '../actions/networks';
// import { watchNetworkHistoryChangedEvent } from '../actions/networks';

function mapStateToProps(state) {
	return {
		history: state.networkHistory.networkHistoryItemList.history,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onGetNetworkHistoryItem: ( networkId ) => dispatch( getNetworkHistoryItem( networkId ) ),
	};
}

const networkHistoryContainer = connect(mapStateToProps, mapDispatchToProps)(NetworkHistory);

export default networkHistoryContainer;