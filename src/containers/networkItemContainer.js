import { connect } from 'react-redux';
import NetworkItem from '../components/NetworkItem.jsx';
import { createNetworkHistoryItem } from '../actions/network';
import { updatePoem } from '../actions/poem';

function mapStateToProps(state) {
	return {
		user: state.user.activeUser.data
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onCreateNetworkHistoryItem: ( networkId, data ) => dispatch( createNetworkHistoryItem( networkId, data ) ),
		onUpdatePoem: ( networkId, data ) => dispatch( updatePoem( networkId, data) ),
	};
}

const networkItemContainer = connect(mapStateToProps, mapDispatchToProps)(NetworkItem);

export default networkItemContainer;