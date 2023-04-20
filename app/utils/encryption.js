const { CryptoJS } = require("crypto-js");

module.exports = {

    base64Encrypt: (string) => {
        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(string));
    },

    base64Decrypt: (data) => {
        return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
    },

    encryptWithAES: (string, passphrase) => {
        return CryptoJS.AES.encrypt(string, passphrase).toString();
    },

    decryptWithAES:  (ciphertext, passphrase) => {
        const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    }

}