import * as React from 'react'
import { purist } from "@reacting/purist";

import mapStorageToProps from './mapStorageToProps'
import { DEFAULT_MAPPER } from "./consts";

export default Consumer => (mapper = DEFAULT_MAPPER) => Comp => {
  return purist(props => (
    <Consumer>
      {storage => {
        const newProps = mapStorageToProps(storage, props, mapper);
        return <Comp {...newProps} />;
      }}
    </Consumer>
  ));
};
