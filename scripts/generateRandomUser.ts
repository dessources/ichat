import { faker } from "@faker-js/faker";
import { SALT_ROUNDS } from "../src/utils/constants";
import { hash } from "bcrypt";
import User from "../src/models/User";

async function createRandomUser(): Promise<Partial<User>> {
  return {
    name: faker.name.fullName(),
    username: faker.internet.userName(),
    profilePicture: faker.image.avatar(),
    password: await hash(faker.internet.password(), SALT_ROUNDS),
  };
}

const user = createRandomUser().then((user) => console.log(user));
// console.dir(user);
export {};
