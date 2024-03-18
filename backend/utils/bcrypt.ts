import bcrypt from 'bcrypt';
async function encrypt(data:string){
    const salt = bcrypt.genSaltSync(10);
    const encrypted = await bcrypt.hash(data,salt);
    return encrypted;
}
async function decrypt(textPassword:string,hashPassword:string){
    return await bcrypt.compare(textPassword,hashPassword);
}
export{encrypt,decrypt}