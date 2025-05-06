import { hkdf } from './crypto';

const OUTPUT_SIZE = 128;

class LT_HASH_ANTI_TAMPERING {
  private salt: string;

  constructor(salt: string) {
    this.salt = salt;
  }

  async add(hash: Promise<ArrayBuffer>, items: string[]): Promise<ArrayBuffer> {
    for (const item of items) {
      hash = await this._addSingle(hash, item);
    }
    return hash;
  }

  async subtract(hash: Promise<ArrayBuffer>, items: string[]): Promise<ArrayBuffer> {
    for (const item of items) {
      hash = await this._subtractSingle(hash, item);
    }
    return hash;
  }

  async subtractThenAdd(hash: Promise<ArrayBuffer>, itemsToAdd: string[], itemsToSubtract: string[]): Promise<ArrayBuffer> {
    return await this.add(await this.subtract(hash, itemsToSubtract), itemsToAdd);
  }

  private async _addSingle(hash: Promise<ArrayBuffer>, item: string): Promise<ArrayBuffer> {
    const hkdfResult = await hkdf(Buffer.from(item), OUTPUT_SIZE, { info: this.salt });
    const n = new Uint8Array(hkdfResult).buffer;
    const resolved = await hash;
    return this.performPointwiseWithOverflow(resolved, n, (a, b) => a + b);
  }

  private async _subtractSingle(hash: Promise<ArrayBuffer>, item: string): Promise<ArrayBuffer> {
    const hkdfResult = await hkdf(Buffer.from(item), OUTPUT_SIZE, { info: this.salt });
    const n = new Uint8Array(hkdfResult).buffer;
    const resolved = await hash;
    return this.performPointwiseWithOverflow(resolved, n, (a, b) => a - b);
  }

  private performPointwiseWithOverflow(e: ArrayBuffer, t: ArrayBuffer, operation: (a: number, b: number) => number): ArrayBuffer {
    let n: DataView, i: DataView;
    try {
      const eBuf = e instanceof ArrayBuffer ? e : (e as any).buffer;
      const tBuf = t instanceof ArrayBuffer ? t : (t as any).buffer;
      n = new DataView(eBuf);
      i = new DataView(tBuf);
    } catch (err) {
      console.error("DataView creation failed:", err);
      console.error("e:", e);
      console.error("t:", t);
      throw err;
    }
    const resultBuffer = new ArrayBuffer(n.byteLength);
    const s = new DataView(resultBuffer);
    for (let offset = 0; offset < n.byteLength; offset += 2) {
      s.setUint16(offset, operation(n.getUint16(offset, true), i.getUint16(offset, true)), true);
    }
    return resultBuffer;
  }
}

export const LT_HASH_ANTI_TAMPERING = new LT_HASH_ANTI_TAMPERING("WhatsApp Patch Integrity");
