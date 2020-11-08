import React = require("react");
import "./index.scss";
import { XCircle } from "react-feather";
import { Button } from "../../components/button";
import web3Handler from "../../web3-handler";
import * as History from "history";

const RegExNum = /^[0-9\b]+$/;

interface State {
  name: string;
  age: string;
  city: string;
  note: string;
  error: {
    name?: string;
    age?: string;
    city?: string;
    note?: string;
  };
  show: boolean;
}

interface Props {
  location: History.Location;
  history: History.History;
}

export class AddCitizen extends React.Component<Props, State> {
  state: State = {
    name: "",
    age: "",
    city: "",
    note: "",
    error: {},
    show: false,
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: true,
      });
    }, 10);
  }

  async submitForm() {
    this.state.error = {};
    let isFormValid = true;
    if (this.state.name.trim() === "") {
      this.state.error.name = "Name should not be empty.";
      isFormValid = false;
    }
    if (this.state.age.trim() === "") {
      this.state.error.age = "Age should not be empty.";
      isFormValid = false;
    }
    if (this.state.city.trim() === "") {
      this.state.error.city = "City should not be empty.";
      isFormValid = false;
    }
    if (this.state.note.trim() === "") {
      this.state.error.note = "Note should not be empty.";
      isFormValid = false;
    }

    this.setState({});
    if (isFormValid) {
      try {
        await web3Handler.addCitizen({
          id: (await web3Handler.getCount()) + 1,
          name: this.state.name,
          age: parseInt(this.state.age),
          city: this.state.city,
          note: this.state.note,
          index: -1,
        });
        this.props.history.push("/" + this.props.location.search);
        setTimeout(() => {
          alert(
            `Citizen added successfully. It may take a minute to appear in database.\nYou can reload page to see it.`
          );
        });
      } catch {
        alert("Failed to add Citizen. Please try again.");
      }
    }
  }

  getInput(data: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
  }) {
    return (
      <div className={"row"}>
        <div className={"label"}>{data.label}</div>
        <input
          value={data.value}
          onChange={data.onChange}
          className={"textbox"}
        />
        {
          <div className={"error " + !!data.error}>
            {data.error ? data.error : "-"}
          </div>
        }
      </div>
    );
  }

  render() {
    return (
      <div className={"add-citizen" + (this.state.show ? " show" : "")}>
        <div className={"form"}>
          <div className={"header"}>
            Add Citizen
            <div
              onClick={() => {
                this.props.history.push("/" + this.props.location.search);
              }}
              className={"close"}
            >
              <XCircle />
            </div>
          </div>
          <div className={"body"}>
            {this.getInput({
              label: "Name",
              value: this.state.name,
              error: this.state.error.name,
              onChange: (e) => {
                const value = e.target.value;
                this.setState({
                  name: value,
                });
              },
            })}
            {this.getInput({
              label: "Age",
              value: this.state.age,
              error: this.state.error.age,
              onChange: (e) => {
                const value = e.target.value;
                if (value === "" || RegExNum.test(value)) {
                  const num = value ? parseInt(value) : 0;
                  if (num <= 150) {
                    this.setState({
                      age: num
                        ? num > 150
                          ? (150).toString()
                          : num.toString()
                        : "",
                    });
                  }
                }
              },
            })}
            {this.getInput({
              label: "City",
              value: this.state.city,
              error: this.state.error.city,
              onChange: (e) => {
                const value = e.target.value;
                this.setState({
                  city: value,
                });
              },
            })}
            {this.getInput({
              label: "Note",
              value: this.state.note,
              error: this.state.error.note,
              onChange: (e) => {
                const value = e.target.value;
                this.setState({
                  note: value,
                });
              },
            })}
          </div>
          <div className={"footer"}>
            <Button
              text={"Submit"}
              onClick={() => {
                this.submitForm();
              }}
              className={"submit"}
            />
          </div>
        </div>
      </div>
    );
  }
}
