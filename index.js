//Dependencies
const Crypto = require("crypto")
const Chalk = require("chalk")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Functions
function Encrypt(){
    const cipher = Crypto.createCipher("aes-256-cbc", Self_Args[3])
    const input = Fs.createReadStream(Self_Args[1])
    const output = Fs.createWriteStream(Self_Args[2])

    input.pipe(cipher).pipe(output)

    output.on("finish", function(){
        console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} File successfully encrypted and saved to ${Self_Args[2]}.`)
        process.exit()
    })

    output.on("error", function(){
        console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} Something went wrong while encrypting the file.`)
        process.exit()
    })
}

function Decrypt(){
    const cipher = Crypto.createDecipher("aes-256-cbc", Self_Args[3])
    const input = Fs.createReadStream(Self_Args[1])
    const output = Fs.createWriteStream(Self_Args[2])

    input.pipe(cipher).pipe(output)

    output.on("finish", function(){
        console.log(`${Chalk.grey("[") + Chalk.blueBright("INFO") + Chalk.grey("]")} File successfully decrypted and saved to ${Self_Args[2]}.`)
        process.exit()
    })

    output.on("error", function(){
        console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} Something went wrong while decrypting the file.`)
        process.exit()
    })
}

//Main
if(Self_Args.length == 0){
    console.log(`node index.js <encrypt/decrypt> <input_file_path> <output_file_path> <password>
Example: node index.js encrypt ./encryptme_test.txt ./encryptme_test.enc abcd555`)
    process.exit()
}

if(!Fs.existsSync(Self_Args[1])){
    console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} input_file_path path doesn't exist.`)
    process.exit()
}

if(Self_Args[2] == ""){
    console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} output_file_path path doesn't exist.`)
    process.exit()
}

if(Self_Args[3] == ""){
    console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} password is empty.`)
    process.exit()
}

if(Self_Args[0] == "encrypt"){
    console.log(`${Chalk.grey("[") + Chalk.blueBright("INFO") + Chalk.grey("]")} Encrypting the file, please wait.`)
    Encrypt()
    return
}else if(Self_Args[0] == "decrypt"){
    console.log(`${Chalk.grey("[") + Chalk.blueBright("INFO") + Chalk.grey("]")} Decrypting the file, please wait.`)
    Decrypt()
    return
}else{
    console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} The option is neither encrypt/decrypt, Please choose from those two only.`)
    process.exit()
}
