import conf from "../conf/conf.js";
import { Client, Databases, ID, Query, Account, Storage } from "appwrite";

export class Services {
  client = new Client();
  databases;
  account;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createUser(
    userId,
    { name, profileImageId, state, city, issuesReported }
  ) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        userId,
        {
          name,
          profileImage: profileImageId,
          state,
          city,
          issuesReported,
        }
      );
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  async updateUser(
    userId,
    { name, profileImageId, state, city, issuesReported }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        userId,
        {
          name,
          profileImage: profileImageId,
          state,
          city,
          issuesReported,
        }
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  async getCurrentUserProfile() {
    try {
      const user = await this.account.get();
      const profile = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        user.$id
      );
      return { ...user, ...profile };
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }
  async deleteUser(userId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        userId
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
}

export const appwriteService = new Services();
