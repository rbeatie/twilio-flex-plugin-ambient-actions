import React from 'react';
import {ContextProvider, withTaskContext} from "@twilio/flex-ui";

function Panel2Composite() {

  return class extends React.Component {

    constructor(props) {
      super(props);
      this.actionSetStateHandler = this.actionSetStateHandler.bind(this);
    }

    componentDidMount() {
       // Check and ensure there is a flex Flex Object to use.
      const {flex} = this.props;
      if (flex) {

        // URL to Actions Docs: https://www.twilio.com/docs/flex/actions-framework#registering-and-invoking-actions
        // flex.Actions.registerAction(name: string, action: ActionFunction, payloadUpdate?: PayloadUpdateFunction)

        // You need to bind the action handler with the classes context to be able to call this.setState
        flex.Actions.registerAction('SetState', this.actionSetStateHandler);

      }
    }

    actionSetStateHandler(nextState) {
      this.setState(nextState)
    }

    render() {
      const { flex, manger} = this.props;
      const { AgentDesktopView } = flex;
      const { Panel2 } = AgentDesktopView;

      if (!manger) {
        return <div />;
      }
      return (
        <ContextProvider
          manager={manger}
        >
          <AgentDesktopView
            {...this.props}
            showPanel2={this.state.showPanel2}
          />
          <Panel2 {...this.props} />
        </ContextProvider>
      )
    }
  }
}

export default Panel2Composite();
