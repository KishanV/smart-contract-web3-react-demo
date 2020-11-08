import React = require("react");
import "./index.scss";
import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from "react-feather";

interface State {
  currentPage: number;
}

interface Props {
  count: number;
  currentPage: number;
  pageSize: number;
  onChange: (newPageNumber: number) => void;
}

export class Pagination extends React.Component<Props, State> {
  state: State = {
    currentPage: 1,
  };

  constructor(props: any) {
    super(props);
    this.state.currentPage = this.props.currentPage;
  }

  componentWillReceiveProps(nextPage: Props) {
    this.state.currentPage = nextPage.currentPage;
  }

  getPageNumber() {
    const totalPage = this.getTotalPage();
    const list = [];
    const getNumber = (pageNumber: number, index: number) => {
      return (
        <div
          key={pageNumber.toString()}
          className={`button ${
            this.props.currentPage === pageNumber ? "current" : ""
          }`}
          onClick={() => {
            this.props.onChange(pageNumber);
          }}
        >
          {pageNumber}
        </div>
      );
    };
    if (totalPage <= 3) {
      for (let index = 0; index < totalPage; index++) {
        list.push(getNumber(index + 1, index));
      }
    } else {
      let start = 0;
      let end = 0;
      if (this.props.currentPage === 1) {
        start = 1;
        end = 4;
      } else if (this.props.currentPage === totalPage) {
        start = this.props.currentPage - 2;
        end = this.props.currentPage + 1;
      } else {
        start = this.props.currentPage - 1;
        end = this.props.currentPage + 2;
      }
      for (let index = start; index < end; index++) {
        list.push(getNumber(index, index));
      }
    }
    return list;
  }

  isOnLastPage() {
    const totalPage = this.getTotalPage();
    return this.props.currentPage === totalPage;
  }

  getTotalPage() {
    return Math.ceil(this.props.count / this.props.pageSize);
  }

  nextPage() {
    if (this.isOnLastPage()) {
      return (
        <div className={`button disable`}>
          <ChevronRight />
        </div>
      );
    }
    return (
      <div
        onClick={() => {
          this.props.onChange(this.props.currentPage + 1);
        }}
        className={"button"}
      >
        <ChevronRight />
      </div>
    );
  }

  prevPage() {
    if (this.props.currentPage === 1) {
      return (
        <div className={`button disable`}>
          <ChevronLeft />
        </div>
      );
    }
    return (
      <div
        onClick={() => {
          this.props.onChange(this.props.currentPage - 1);
        }}
        className={"button"}
      >
        <ChevronLeft />
      </div>
    );
  }

  lastPage() {
    if (this.isOnLastPage()) {
      return (
        <div className={`button disable`}>
          <ChevronsRight />
        </div>
      );
    }
    return (
      <div
        onClick={() => {
          this.props.onChange(this.getTotalPage());
        }}
        className={"button"}
      >
        <ChevronsRight />
      </div>
    );
  }

  firstPage() {
    if (this.props.currentPage === 1) {
      return (
        <div className={`button disable`}>
          {" "}
          <ChevronsLeft />
        </div>
      );
    }
    return (
      <div
        onClick={() => {
          this.props.onChange(1);
        }}
        className={"button"}
      >
        <ChevronsLeft />
      </div>
    );
  }

  render() {
    return (
      <div className={"pagination"}>
        <div className={"navigation"}>
          {this.firstPage()}
          {this.prevPage()}
          {this.getPageNumber()}
          {this.nextPage()}
          {this.lastPage()}
        </div>
      </div>
    );
  }
}
