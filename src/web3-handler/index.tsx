import { CitizenModel } from "../reducers/citizen/citizen-model";
import ABI from "./abi";
const win = window as any;
class Web3Handler {
  contract?: any;

  isMetamaskInstalled() {
    return win.ethereum && win.ethereum.isMetaMask;
  }

  isMetamaskEnabled() {
    const web3 = new win.Web3(win.web3.currentProvider);
    web3.eth.defaultAccount = web3.eth.accounts[0];
    return web3.eth.defaultAccount !== undefined;
  }

  isReady() {
    return this.isMetamaskInstalled() && this.isMetamaskInstalled();
  }

  async enable() {
    win.ethereum.enable();
  }

  load() {
    const web3 = new win.Web3(win.web3.currentProvider);
    web3.eth.defaultAccount = web3.eth.accounts[0];
    const ContractABI = web3.eth.contract(ABI);
    this.contract = ContractABI.at(
      "0xd39B135B66c3D47d068F71eea9c44b157DA33Ac9"
    );
  }

  async getCount(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contract.getCount((error: any, data: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(data.c[0]);
        }
      });
    });
  }

  async getCitizens(from: number, to: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let count = from;
      let list: CitizenModel[] = [];
      for (let index = from; index < to; index++) {
        this.contract.getCitizenByIndex(index, (error: any, data: any) => {
          count++;
          list.push({
            id: data[0].c[0],
            name: data[1],
            age: data[2].c[0],
            city: data[3],
          });

          if (count === to) {
            resolve(
              list.sort((a, b) => {
                return a.id - b.id;
              })
            );
          }
        });
      }
    });
  }

  async addCitizen(data: CitizenModel) {
    return new Promise((resolve, reject) => {
      this.contract.addCitizen(
        data.id,
        data.age,
        data.city,
        data.name,
        data.note,
        (error: any, data: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
}
export default new Web3Handler();
