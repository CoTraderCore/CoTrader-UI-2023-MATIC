import MerkleTree from 'merkletreejs';
import CryptoJS from 'crypto-js'; // Import CryptoJS library
import WhiteListedTokens from '../Storage/WhiteListedTokens';

const buf2hex = x => '0x' + x.toString();
const leaves = WhiteListedTokens.map(x => CryptoJS.SHA3(x, { outputLength: 256 }).toString(CryptoJS.enc.Hex)).sort();

const tree = new MerkleTree(leaves, CryptoJS.SHA3);

const getMerkleTreeData = (tokenAddress) => {
  const leaf = CryptoJS.SHA3(tokenAddress, { outputLength: 256 }).toString(CryptoJS.enc.Hex);
  const proof = tree.getProof(leaf).map(x => buf2hex(x.data));
  const positions = tree.getProof(leaf).map(x => x.position === 'right' ? 1 : 0);

  return { proof, positions };
}

export default getMerkleTreeData;
