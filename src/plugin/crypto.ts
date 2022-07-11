import md5 from 'crypto-js/md5'
const salt = 'salt:front';
export const toMD5 = (password: string) => {
  const saltPassword = `${password}:${salt}`;
  const result = md5(saltPassword).toString()
  return result
}


// import Base64 from 'crypto-js/enc-base64';
// const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));
