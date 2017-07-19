import { connect } from 'react-redux';
import CreateNetworkForm from '../components/pages/create/createNetworkForm';
import { createNetwork } from '../actions/networks';

function mapStateToProps(state) {
	return {
		user: state.user.activeUser.data
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onCreateNetwork: ( data ) => dispatch( createNetwork( data ) ),
	}
}

const createNetworkFormContainer = connect(mapStateToProps, mapDispatchToProps)(CreateNetworkForm);

export default createNetworkFormContainer;