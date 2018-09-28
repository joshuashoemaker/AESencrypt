var os = require('os')
if (os.platform() === 'win32') {
  var chilkat = require('chilkat_node8_win32')
} else if (os.platform() === 'linux') {
  if (os.arch() === 'arm') {
    var chilkat = require('chilkat_node8_arm')
  } else if (os.arch() == 'x86') {
    var chilkat = require('chilkat_node8_linux32')
  } else {
    var chilkat = require('chilkat_node8_linux64')
  }
} else if (os.platform() == 'darwin') {
  var chilkat = require('chilkat_node8_macosx')
}

function chilkatExample () {
  var crypt = new chilkat.Crypt2()

  //  Any string argument automatically begins the 30-day trial.
  var success = crypt.UnlockComponent('30-day trial')
  if (success !== true) {
    console.log(crypt.LastErrorText)
    return
  }

  crypt.CryptAlgorithm = 'aes'

  //  CipherMode may be "ecb" or "cbc"
  crypt.CipherMode = 'cbc'

  //  KeyLength may be 128, 192, 256
  crypt.KeyLength = 256

  //  The padding scheme determines the contents of the bytes
  //  that are added to pad the result to a multiple of the
  //  encryption algorithm's block size.  AES has a block
  //  size of 16 bytes, so encrypted output is always
  //  a multiple of 16.
  crypt.PaddingScheme = 0

  //  An initialization vector is required if using CBC mode.
  //  ECB mode does not use an IV.
  //  The length of the IV is equal to the algorithm's block size.
  //  It is NOT equal to the length of the key.
  var ivHex = '000102030405060708090A0B0C0D0E0F'
  crypt.SetEncodedIV(ivHex, 'hex')

  //  The secret key must equal the size of the key.  For
  //  256-bit encryption, the binary secret key is 32 bytes.
  //  For 128-bit encryption, the binary secret key is 16 bytes.
  var keyHex = '000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F'
  crypt.SetEncodedKey(keyHex, 'hex')

  //  For demonstration purposes, a different instance of the object will be used
  //  for decryption.
  var decrypt = new chilkat.Crypt2()

  //  All settings must match to be able to decrypt:
  decrypt.CryptAlgorithm = 'aes'
  decrypt.CipherMode = 'cbc'
  decrypt.KeyLength = 256
  decrypt.PaddingScheme = 0
  decrypt.SetEncodedIV(ivHex, 'hex')
  decrypt.SetEncodedKey(keyHex, 'hex')

  //  Decrypt the .aes
  const inFile = './encodedData.zip.aes'
  const outFile = './decodedData.zip'
  console.log('Decodding...')
  console.log('This may take a while depending on how large your file is...')
  success = decrypt.CkDecryptFile(inFile, outFile)
  if (success === false) {
    console.log(decrypt.LastErrorText)
    return
  }

  console.log('Success!')
}

chilkatExample()
