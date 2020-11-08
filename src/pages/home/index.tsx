import * as React from "react";
import "./index.scss";
import { ReduxType } from "../../reducers";
import { connect } from "react-redux";
import { Pagination } from "../../components/pagination";
import { CitizenCard } from "../../components/citizen-card";
import { CitizenModel } from "../../reducers/citizen/citizen-model";
import web3 from "../../web3-handler/index";
import { CitizenController } from "../../reducers/citizen";
import { Button } from "../../components/button";

export type PostsProps = {
  reduxDispatch: any;
  citizens: CitizenModel[] | undefined;
};

export type PostsState = {
  fetching: boolean;
  count: number;
  currentPage: number;
};

class Home extends React.Component<PostsProps, any> {
  state: PostsState = {
    fetching: false,
    currentPage: 1,
    count: 0,
  };

  constructor(props: any) {
    super(props);
  }

  getBody() {
    return (
      <div className={"web3"}>
        <div className="address">Citizens Smart Contracts</div>
        {this.props.citizens && (
          <div className="citizens">
            <div className="header">
              List of Citizens
              <Button
                text={"Add Citizen"}
                onClick={() => {
                  window.location.href = "/#/add-citizen";
                }}
              />
            </div>
            <div className="list">
              {this.props.citizens &&
                this.props.citizens.map((item, index) => {
                  return (
                    <CitizenCard
                      key={index + this.state.currentPage * 6}
                      name={item.name}
                      age={item.id}
                      city={item.city}
                    />
                  );
                })}
            </div>
            <Pagination
              onChange={(newPageNumber) => {
                this.setState(
                  {
                    currentPage: newPageNumber,
                  },
                  () => {
                    this.loadCitizens();
                  }
                );
              }}
              currentPage={this.state.currentPage}
              pageSize={6}
              count={this.state.count}
            />
          </div>
        )}
      </div>
    );
  }

  notInstall() {
    return (
      <>
        <div className="error">Please Install MetaMask plugin.</div>
      </>
    );
  }

  notConnected() {
    return (
      <>
        <div className="error">
          MetaMask is not connected. connect by clicking below button.
        </div>
        <div
          onClick={async () => {
            try {
              web3.enable();
              this.loadLib();
            } catch {}
          }}
          className="enable-button"
        >
          Connect
        </div>
      </>
    );
  }

  render() {
    const isMetamaskInstalled = web3.isMetamaskInstalled();
    if (!isMetamaskInstalled) {
      return this.notInstall();
    }
    const isMetamaskEnabled = web3.isMetamaskEnabled();
    if (!isMetamaskEnabled) {
      return this.notConnected();
    }
    return this.getBody();
  }

  async loadCitizens() {
    const from = (this.state.currentPage - 1) * 6;
    const to = from + 6 > this.state.count ? this.state.count : from + 6;
    const data = await web3.getCitizens(from, to);
    this.props.reduxDispatch(CitizenController.setData(data));
  }

  async loadLib() {
    web3.load();
    const count = await web3.getCount();
    this.setState({
      count,
    });
    this.loadCitizens();
  }

  componentDidMount() {
    if (web3.isReady()) {
      this.loadLib();
    }
  }
}

const mapStateToProps = (state: ReduxType) => {
  return {
    citizens: state.citizens.list,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    reduxDispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
