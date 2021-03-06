import produce from "immer";

const sslkey = produce(
  (draft, action) => {
    switch (action.type) {
      case "FETCH_SSLKEY_START":
        draft.loading = true;
        break;
      case "FETCH_SSLKEY_SUCCESS":
        draft.errors = null;
        draft.loading = false;
        draft.loaded = true;
        draft.items = action.payload;
        break;
      case "FETCH_SSLKEY_ERROR":
        draft.loading = false;
        draft.loaded = false;
        draft.errors = action.error;
        break;
      case "CREATE_SSLKEY_START":
      case "DELETE_SSLKEY_START":
        draft.saved = false;
        draft.saving = true;
        break;
      case "CREATE_SSLKEY_ERROR":
      case "DELETE_SSLKEY_ERROR":
        draft.errors = action.error;
        draft.saving = false;
        break;
      case "CREATE_SSLKEY_SUCCESS":
      case "DELETE_SSLKEY_SUCCESS":
        draft.errors = {};
        draft.saved = true;
        draft.saving = false;
        break;
      case "CREATE_SSLKEY_NOTIFY":
        draft.items.push(action.payload);
        break;
      case "DELETE_SSLKEY_NOTIFY":
        const index = draft.items.findIndex(item => item.id === action.payload);
        draft.items.splice(index, 1);
        break;
      case "CLEANUP_SSLKEY":
        draft.errors = {};
        draft.saved = false;
        draft.saving = false;
        break;
      default:
        return draft;
    }
  },
  {
    errors: null,
    items: [],
    loaded: false,
    loading: false,
    saved: false,
    saving: false
  }
);

export default sslkey;
