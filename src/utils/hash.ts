import { hash as bcryptHash } from "bcrypt";
function hash(text) {
  bcryptHash(text, 10);
}
