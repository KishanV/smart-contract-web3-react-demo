import React = require("react");
import "./index.scss";
import { User } from "react-feather";

interface State {}

interface Props {
  name: string;
  age: number;
  city: string;
}

export class CitizenCard extends React.Component<Props, State> {
  state: State = {};

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={"citizen-card"}>
        <div className="user-image">
          <User />
        </div>
        <div className="info">
          <div className="row">
            <span className="lable"> Name:</span> {this.props.name}
          </div>
          <div className="row">
            <span className="lable"> Age:</span> {this.props.age}
          </div>
          <div className="row">
            <span className="lable"> City:</span> {this.props.city}
          </div>
        </div>
      </div>
    );
  }
}
