import * as React from "react";
import createContext from "create-react-context";
import storageUtils from "storage-utilities";
import storageChanged from "storage-changed";

import addStorageListener from './addStorageListener'
import createConsumerHOC from './createConsumerHOC'
import generateHOCName from './generateHOCName'

class Provider extends React.Component<any, any> {
  removeListener: Function
  state = this.props.initialState;
  provider = this.props.context.Provider;

  componentDidMount() {
    storageChanged(this.props.which);

    this.removeListener = this.props.listener(event => {
      this.setState(state => ({
        ...state,
        [event.detail.key]: event.detail.value
      }));
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <this.props.context.Provider value={this.state}>
        {this.props.children}
      </this.props.context.Provider>
    );
  }
}

const createStorageContext = which => {
  const initialState = storageUtils.parseValues(window[`${which}Storage`]);
  const context = createContext(null);
  const listener = addStorageListener("local");

  const provider = props => (
    <Provider
      {...props}
      which={which}
      initialState={initialState}
      context={context}
      listener={listener}
    />
  );

  const consumer = context.Consumer;
  const hoc = createConsumerHOC(consumer);
  const hocName = generateHOCName(which);

  return {
    Provider: provider,
    Consumer: consumer,
    Context: context,
    [hocName]: hoc
  };
};

export const LocalStorage = createStorageContext("local");
export const SessionStorage = createStorageContext("session");

export const { withLocalStorage } = LocalStorage;
export const { withSessionStorage } = SessionStorage;
