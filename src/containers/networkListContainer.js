import { connect } from 'react-redux';
import NetworkList from '../components/NetworkList.jsx';
import { watchPoemChangedEvent } from '../actions/poem';
import { deletePoem } from '../actions/poem';
import { createPendingDeletion } from '../actions/pending';
import { watchPendingChangedEvent } from '../actions/pending';

function mapStateToProps(state) {
	console.log(state);
	return {
		networks: state.poem.items,
		live: state.poem.live,
		user: state.user.activeUser.data,
		pending: state.pending.items,
	}
}

function mapDispatchToProps(dispatch) {
	watchPoemChangedEvent(dispatch);
	watchPendingChangedEvent(dispatch);
	return {
		onCreatePendingDeletion: ( networkId, data ) => dispatch( createPendingDeletion( networkId, data ) ),
		onDeletePoem: ( networkId, data ) => dispatch( deletePoem( networkId, data ) ),
	};
}

const networkListContainer = connect(mapStateToProps, mapDispatchToProps)(NetworkList);

export default networkListContainer;