import { useSelector } from "react-redux";
import React from "react";
import PropTypes from "prop-types";

import { machine as machineSelectors } from "app/base/selectors";
import Tooltip from "app/base/components/Tooltip";

const generateFQDN = (machine, machineURL) => {
  const name = (
    <a href={machineURL} title={machine.fqdn}>
      <strong>
        {machine.locked ? (
          <span title="This machine is locked. You have to unlock it to perform any actions.">
            <i className="p-icon--locked">Locked: </i>{" "}
          </span>
        ) : null}
        {machine.hostname}
      </strong>
      <small>.{machine.domain.name}</small>
    </a>
  );
  let ipAddresses = [];
  let bootIP;
  (machine.ip_addresses || []).forEach(address => {
    let ip = address.ip;
    if (address.is_boot) {
      ip = `${ip} (PXE)`;
      bootIP = ip;
    }
    if (!ipAddresses.includes(ip)) {
      ipAddresses.push(ip);
    }
  });
  if (ipAddresses.length === 0) {
    return name;
  }
  let ipAddressesLine = (
    <span data-test="ip-addresses">
      {bootIP || ipAddresses[0]}
      {ipAddresses.length > 1 ? ` (+${ipAddresses.length - 1})` : null}
    </span>
  );

  if (ipAddresses.length > 1) {
    ipAddressesLine = (
      <Tooltip
        position="btm-left"
        message={
          <>
            <strong>{ipAddresses.length} interfaces:</strong>
            <ul className="p-list u-no-margin--bottom">
              {ipAddresses.map(address => (
                <li key={address}>{address}</li>
              ))}
            </ul>
          </>
        }
      >
        {ipAddressesLine}
      </Tooltip>
    );
  }

  return (
    <div className="p-double-row">
      <div className="p-double-row__primary-row">{name}</div>
      <div className="p-double-row__secondary-row">{ipAddressesLine}</div>
    </div>
  );
};

const generateMAC = (machine, machineURL) => {
  return (
    <>
      <a href={machineURL} title={machine.pxe_mac_vendor}>
        {machine.pxe_mac}
      </a>{" "}
      {machine.extra_macs && machine.extra_macs.length > 0 ? (
        <a href={machineURL}>(+{machine.extra_macs.length})</a>
      ) : null}
    </>
  );
};

const NameColumn = ({ showMAC, systemId }) => {
  const machine = useSelector(state =>
    machineSelectors.getBySystemId(state, systemId)
  );
  const machineURL = `${process.env.REACT_APP_ANGULAR_BASENAME}/${machine.link_type}/${machine.system_id}`;
  return showMAC
    ? generateMAC(machine, machineURL)
    : generateFQDN(machine, machineURL);
};

NameColumn.propTypes = {
  showMAC: PropTypes.bool,
  systemId: PropTypes.string.isRequired
};

export default NameColumn;
