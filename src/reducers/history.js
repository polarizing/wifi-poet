import C from '../constants';

const INITIAL_STATE = {
  networkHistoriesList: { histories: [], error: null, loading: false },
  networkHistoryItemList: { history: [], error: null, loading: false },
  newNetworkHistoryItem: { history: null, error: null, loading: false }
}

function history(state = INITIAL_STATE, action) {
  
  let error;

  switch(action.type) {
    case C.NETWORK_HISTORIES_CHANGED: {
      console.log('histories changed');
        const histories = action.payload;
        const newHistories = [];
        for (let history in histories) {
          var items = [];
          for (let item in histories[history]) {
            var curr = histories[history][item]
            items.push({
              id: item,
              author: curr.author,
              name: curr.name,
              created_at: curr.created_at
            })
          }
          newHistories.push({
            id: history,
            data: items
          })
        }
        return { ...state, networkHistoriesList: { histories: newHistories, error: null, loading: false } } 
    }

    case C.GET_NETWORK_HISTORIES_REQUESTED:
      return { ...state, networkHistoriesList: { histories: [], error: null, loading: true } }
    case C.GET_NETWORK_HISTORIES_REJECTED:
      error = action.payload || "Error in getting network histories."
      return { ...state, networkHistoriesList: { histories: [], error: error, loading: false } }
    case C.GET_NETWORK_HISTORIES_FULFILLED: {
            const histories = action.payload;
            const newHistories = [];
            for (let history in histories) {
              var items = [];
              for (let item in histories[history]) {
                var curr = histories[history][item]
                items.push({
                  id: item,
                  author: curr.author,
                  name: curr.name,
                  created_at: curr.created_at
                })
              }
              newHistories.push({
                id: history,
                data: items
              })
            }
        return { ...state, networkHistoriesList: { histories: newHistories, error: null, loading: false } } 
    }

    case C.GET_NETWORK_HISTORY_ITEM_REQUESTED:
      return { ...state, networkHistoryItemList: { history: [], error: null, loading: true } }
    case C.GET_NETWORK_HISTORY_ITEM_REJECTED:
      error = action.payload || "Error in getting network history item."
      return { ...state, networkHistoryItemList: { history: [], error: error, loading: false } }
    case C.GET_NETWORK_HISTORY_ITEM_FULFILLED: {
            const history = action.payload;
            const newHistory = [];
            for (let item in history) {
              newHistory.push({
                id: item,
                name: history[item].name,
                created_at: history[item].created_at,
                author: history[item].author
              })
            }
            newHistory.reverse();
        return { ...state, networkHistoryItemList: { history: newHistory, error: null, loading: false } }
          }

    case C.CREATE_NETWORK_HISTORY_ITEM_REQUESTED:
        return { ...state, newNetworkHistoryItem: { ...state.newNetworkHistoryItem, loading: true }}
    case C.CREATE_NETWORK_HISTORY_ITEM_REJECTED:
      error = action.payload || "Error in creating network history item."
      return { ...state, newNetworkHistoryItem: { history: null, error: error, loading: false}}
    case C.CREATE_NETWORK_HISTORY_ITEM_FULFILLED:
      return { ...state, newNetworkHistoryItem: { history: action.payload, error: null, loading: false}}

    default:
      return state;
  }
}

module.exports = {
  history,
}
