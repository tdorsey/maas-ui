/**
 * Selector for os info.
 */
import { createSelector } from "reselect";
import { generateGeneralSelector } from "./utils";

const osInfo = generateGeneralSelector("osInfo");

/**
 * Returns kernels data
 * @param {Object} state - the redux state
 * @param {String} release - the release to get kernel options for
 * @returns {Array} - the available kernel options
 */
osInfo.getUbuntuKernelOptions = (state, release) => {
  const { data } = state.general.osInfo;
  let kernelOptions = [];

  if (data.kernels && data.kernels.ubuntu && data.kernels.ubuntu[release]) {
    kernelOptions = data.kernels.ubuntu[release];
  }

  kernelOptions = [["", "No minimum kernel"]].concat(kernelOptions);

  return kernelOptions.map(option => ({
    value: option[0],
    label: option[1]
  }));
};

/**
 * Returns all ubuntu kernel options
 * @param {Object} state - the redux state
 * @returns {Object} - all ubuntu kernel options
 */
osInfo.getAllUbuntuKernelOptions = state => {
  const { data } = state.general.osInfo;
  let allUbuntuKernelOptions = {};

  if (data.kernels && data.kernels.ubuntu) {
    Object.keys(data.kernels.ubuntu).forEach(key => {
      allUbuntuKernelOptions[key] = osInfo.getUbuntuKernelOptions(state, key);
    });
  }

  return allUbuntuKernelOptions;
};

/**
 * Returns OS releases
 * @param {Object} state - the redux state
 * @param {String} os - the OS to get releases of
 * @returns {Array} - the available OS releases
 */
osInfo.getOsReleases = (state, os) => {
  const { data } = state.general.osInfo;
  let osReleases = [];

  if (data.releases) {
    osReleases = data.releases
      .filter(release => release[0].includes(os))
      .map(release => ({
        value: release[0].split("/")[1],
        label: release[1]
      }));
  }

  return osReleases;
};

/**
 * Returns an object with all OS releases
 * @param {Object} state - the redux state
 * @returns {Object} - all OS releases
 */
osInfo.getAllOsReleases = state => {
  const { data } = state.general.osInfo;
  const allOsReleases = {};

  if (data.osystems && data.releases) {
    data.osystems.forEach(osystem => {
      const os = osystem[0];
      allOsReleases[os] = osInfo.getOsReleases(state, os);
    });
  }

  return allOsReleases;
};

/**
 * Returns an object with all OS releases
 * @param {Object} state - the redux state
 * @returns {Object} - all OS releases
 *
 */
osInfo.getLicensedOsReleases = createSelector(
  [osInfo.getAllOsReleases],
  releases => {
    let results = {};
    for (let [key, value] of Object.entries(releases)) {
      const licensedReleases = value.filter(release => {
        return release.value.endsWith("*");
      });

      if (licensedReleases.length > 0) {
        const releases = licensedReleases.map(r => {
          r.value = r.value.slice(0, -1);
          return r;
        });
        results[key] = releases;
      }
    }
    return results;
  }
);

osInfo.getLicensedOsystems = createSelector(
  [osInfo.getLicensedOsReleases],
  releases => {
    const osystems = Object.keys(releases);
    if (osystems) {
      return osystems.map(osystem => [
        osystem,
        `${osystem.charAt(0).toUpperCase()}${osystem.slice(1)}`
      ]);
    }
    return [];
  }
);

export default osInfo;
