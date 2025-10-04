import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
   async createAccount({email, password, name}) {// creating new account and ensuring proper error handling
        try {
            const response = await this.account.create(ID.unique(),email,password,name);
            if (response){
                // call a method because if user already have an account then make it login again
                return await this.login({email, password});
            }
        else {
            return response;
        }
        } catch (error) {
            console.log("error");
            throw error;
        }
    }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout error", error);
    }
  }
  async getCurrentAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentAccount error", error);
    }
  }
}

export const authService = new AuthService();
