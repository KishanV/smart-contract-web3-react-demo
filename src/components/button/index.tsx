import React = require("react");
import "./index.scss";
import { User } from "react-feather";

interface State {}

interface Props {
  text: string;
  className?: string;
  onClick?: () => any;
}

export class Button extends React.Component<Props, State> {
  state: State = {};

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <button
        onClick={this.props.onClick}
        className={
          "common-button " + (this.props.className ? this.props.className : "")
        }
      >
        {this.props.text}
      </button>
    );
  }
}
