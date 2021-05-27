import Web3 = require("web3");
import { CitizenModel } from "../reducers/citizen/citizen-model";
import ABI from "./abi";
const win = window as any;
class Web3Handler {
  contract?: any;

  isMetamaskInstalled() {
    return win.ethereum && win.ethereum.isMetaMask;
  }

  isMetamaskEnabled() {
    return win.ethereum.isConnected();
  }

  isReady() {
    return this.isMetamaskInstalled();
  }

  async enable() {
    await win.ethereum.enable();
  }

  load() {
    const web3 = new (Web3 as any)(win.ethereum);
    web3.eth.defaultAccount = win.ethereum.selectedAddress;
    this.contract = new web3.eth.Contract(
      ABI as any[],
      "0xd39B135B66c3D47d068F71eea9c44b157DA33Ac9"
    );
  }

  async getCount(): Promise<any> {
    return this.contract.methods.getCount().call();
  }

  async getNoteByCitizenIndex(index: number): Promise<any> {
    return this.contract.methods.getNoteByCitizenIndex(index).call();
  }

  async getCitizens(from: number, to: number): Promise<any> {
    const _count = parseInt(await this.getCount());
    to = to > _count ? _count : to;
    return new Promise(async (resolve, reject) => {
      let count = from;
      let list: CitizenModel[] = [];
      for (let index = from; index < to; index++) {
        const _index = index;
        const data = await this.contract.methods
          .getCitizenByIndex(index)
          .call();
        count++;
        list.push({
          id: data[0],
          name: data[1],
          age: data[2],
          city: data[3],
          index: _index,
        });
        if (count === to) {
          resolve(
            list.sort((a, b) => {
              return a.index - b.index;
            })
          );
        }
      }
    });
  }

  addCitizen(data: CitizenModel) {
    return this.contract.methods
      .addCitizen(data.id, data.age, data.city, data.name, data.note)
      .send({
        from: win.ethereum.selectedAddress,
      });
  }
}
export default new Web3Handler();
