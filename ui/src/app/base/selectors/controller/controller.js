const controller = {};

/**
 * Returns all controllers.
 * @param {Object} state - The redux state.
 * @returns {Array} A list of all controllers.
 */
controller.all = state => state.controller.items;

/**
 * Whether controllers are loading.
 * @param {Object} state - The redux state.
 * @returns {Boolean} Controllers loading state.
 */
controller.loading = state => state.controller.loading;

/**
 * Whether controllers have been loaded.
 * @param {Object} state - The redux state.
 * @returns {Boolean} Controllers loaded state.
 */
controller.loaded = state => state.controller.loaded;

/**
 * Returns a controller for the given id.
 * @param {Object} state - The redux state.
 * @returns {Array} A controller.
 */
controller.getBySystemId = (state, id) =>
  state.controller.items.find(controller => controller.system_id === id);

export default controller;
