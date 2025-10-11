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

  async getCurrentUserProfile(userId) {
    try {
      const user = await this.account.get();
      const profile = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        userId
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

  async CreateIssue(
    IssueId,
    { title, description, status, location, severity, upVotes }
  ) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdIssues,
        IssueId,
        {
          title,
          description,
          status,
          location,
          severity,
          upVotes,
        }
      );
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  }

  async UpdateIssue(
    IssueId,
    { title, description, status, location, severity, upVotes }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdIssues,
        IssueId,
        {
          title,
          description,
          status,
          location,
          severity,
          upVotes,
        }
      );
    } catch (error) {
      console.error("Error updating issue:", error);
    }
  }

  async GetIssue(IssueId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdIssues,
        IssueId
      );
    } catch (error) {
      console.error("Error fetching issue:", error);
    }
  }

  async ListIssues() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdIssues
      );
    } catch (error) {
      console.error("Error listing issues:", error);
    }
  }
}

export const appwriteService = new Services();
