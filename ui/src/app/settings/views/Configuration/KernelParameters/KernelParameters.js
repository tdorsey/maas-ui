import { Col, Loader, Row } from "@canonical/react-components";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { config as configActions } from "app/settings/actions";
import { config as configSelectors } from "app/settings/selectors";
import { useWindowTitle } from "app/base/hooks";
import KernelParametersForm from "../KernelParametersForm";

const KernelParameters = () => {
  const loaded = useSelector(configSelectors.loaded);
  const loading = useSelector(configSelectors.loading);
  const dispatch = useDispatch();

  useWindowTitle("Kernel parameters");

  useEffect(() => {
    if (!loaded) {
      dispatch(configActions.fetch());
    }
  }, [dispatch, loaded]);

  return (
    <Row>
      <Col size={6}>
        {loading && <Loader text="Loading..." />}
        {loaded && <KernelParametersForm />}
      </Col>
    </Row>
  );
};

export default KernelParameters;
