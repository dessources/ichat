import { faker } from "@faker-js/faker";
import { SALT_ROUNDS } from "../src/utils/constants";
import { hash } from "bcrypt";
import { User } from "../src/models";

async function createRandomUser(): Promise<
  Partial<User> & { password: string }
> {
  return {
    name: faker.person.fullName(),
    username: faker.internet.username(),
    profilePicture: faker.image.avatar(),
    password: await hash(faker.internet.password(), SALT_ROUNDS),
  };
}

const user = createRandomUser().then((user) => console.log(user));
// console.dir(user);
