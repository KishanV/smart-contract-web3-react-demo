import React = require("react");
import "./index.scss";
import { User, FileText } from "react-feather";
import { CitizenModel } from "../../reducers/citizen/citizen-model";
import web3Handler from "../../web3-handler";
import { NoteController } from "../../reducers/note";
import * as History from "history";

interface State {}

interface Props {
  data: CitizenModel;
  reduxDispatch: any;
  location: History.Location;
  history: History.History;
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
            <span className="label"> Name:</span> {this.props.data.name}
          </div>
          <div className="row">
            <span className="label"> Age:</span> {this.props.data.age}
          </div>
          <div className="row">
            <span className="label"> City:</span> {this.props.data.city}
          </div>
          <div
            onClick={async () => {
              try {
                const note = await web3Handler.getNoteByCitizenIndex(
                  this.props.data.index
                );
                this.props.reduxDispatch(
                  NoteController.setData({
                    note: note,
                    citizen: this.props.data,
                  })
                ); 
                this.props.history.push(
                  "note" + this.props.location.search
                );
              } catch {
                alert("Internal Error. Please try again.");
              }
            }}
            className="note"
          >
            <FileText />
          </div>
        </div>
      </div>
    );
  }
}
