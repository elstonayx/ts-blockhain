import { ec as EllipticCurve } from 'elliptic'

const curve = new EllipticCurve('secp256k1')
const key = curve.genKeyPair()
const publicKey = key.getPublic('hex')
const privateKey = key.getPrivate('hex')

console.log('privateKey:', privateKey)
console.log('publicKey:', publicKey)

