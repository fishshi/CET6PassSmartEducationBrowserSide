import sha256 from "js-sha256"

export const Sha256 = (str) => {
    str += "cet6client";
    return sha256(str).toString();
};