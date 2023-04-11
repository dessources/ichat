import UserAuthInFo from "@/models/UserAuthInfo";
import User from "../models/User";
import ContentAPIService from "./contentApi";

import { hash } from "bcrypt";
class UserService {
  async login(input: UserAuthInFo): Promise<User | Error> {
    const response = await ContentAPIService.loginUser(input);

    return response;
  }

  async register({
    name,
    username,
    password,
    cPassword,
  }: UserAuthInFo): Promise<User | Error> {
    const passwordValidations = [password === cPassword];
    for (let condition of passwordValidations) {
      if (!condition)
        return Promise.reject("The password and confirm password fields do not match");
    }
    const hashedPassword = await hash(password, 10);
    //Create the user
    // In hygraph new content is always in draft mode so
    // we'll need to publish the user later
    const { createIchatUser }: { createIchatUser: { id: string } } = await client.request(
      gql`
        mutation createUser($input: IchatUserCreateInput!) {
          createIchatUser(data: $input) {
            id
          }
        }
      `,
      { input }
    );

    //Publish the user
    const response: Promise<{ publishIchatUser: User }> = client.request(
      gql`
        mutation publishUser($id: ID!) {
          publishIchatUser(where: { id: $id }, to: PUBLISHED) {
            id
          }
        }
      `,
      { id: createIchatUser.id }
    );

    return response.then(({ publishIchatUser }) => publishIchatUser).catch((err) => err);
    return user;
  }

  async logout(id: string) {
    const userId: string = await ContentAPIService.logoutUser(id);
    return userId;
  }

  async loginUser(input: UserAuthInFo): Promise<User | Error> {
    //get the userId
    const { ichatUsers }: { ichatUsers: [{ id: string }] } = await readOnlyClient.request(
      gql`
        query getUserId($input: IchatUserWhereInput!) {
          ichatUsers(where: $input) {
            id
          }
        }
      `,
      { input }
    );

    if (!ichatUsers.length) {
      return Promise.reject("Could not find user with the username and password provided.");
    }

    //set online attribute to true
    const response: Promise<{ updateIchatUser: User }> = client.request(
      gql`
        mutation loginUser($id: ID!) {
          updateIchatUser(where: { id: $id }, data: { online: true }) {
            id
            name
            username
            profilePicture {
              url
            }
          }
        }
      `,
      { id: ichatUsers[0].id }
    );

    return response.then(({ updateIchatUser }) => updateIchatUser).catch((err) => err);
  }

  async logoutUser(id: string): Promise<string> {
    //set online attribute to false
    const response: Promise<{ updateIchatUser: { id: string } }> = client.request(
      gql`
        mutation loginUser($id: ID!) {
          updateIchatUser(where: { id: $id }, data: { online: false }) {
            id
          }
        }
      `,
      { id }
    );

    return response.then(({ updateIchatUser }) => updateIchatUser.id).catch((err) => err);
  }
}

const userService = new UserService();
export default userService;
