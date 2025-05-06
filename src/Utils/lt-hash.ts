"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LT_HASH_ANTI_TAMPERING = void 0;
const crypto_1 = require("./crypto");

const o: number = 128;

class d {
    private salt: string;

    constructor(e: string) {
        this.salt = e;
    }

    async add(e: Promise<ArrayBuffer> | ArrayBuffer, t: Uint8Array[]): Promise<ArrayBuffer> {
        for (const item of t) {
            e = await this._addSingle(e, item);
        }
        return e;
    }

    async subtract(e: Promise<ArrayBuffer> | ArrayBuffer, t: Uint8Array[]): Promise<ArrayBuffer> {
        for (const item of t) {
            e = await this._subtractSingle(e, item);
        }
        return e;
    }

    async subtractThenAdd(
        e: Promise<ArrayBuffer> | ArrayBuffer, 
        t: Uint8Array[], 
        r: Uint8Array[]
    ): Promise<ArrayBuffer> {
        return await this.add(await this.subtract(e, r), t);
    }

    async _addSingle(e: Promise<ArrayBuffer> | ArrayBuffer, t: Uint8Array): Promise<ArrayBuffer> {
        const hkdfResult = await (0, crypto_1.hkdf)(Buffer.from(t), o, { info: this.salt });
        const n = new Uint8Array(hkdfResult).buffer;
        const resolved = await e;
        return this.performPointwiseWithOverflow(resolved, n, (a: number, b: number) => a + b);
    }

    async _subtractSingle(e: Promise<ArrayBuffer> | ArrayBuffer, t: Uint8Array): Promise<ArrayBuffer> {
        const hkdfResult = await (0, crypto_1.hkdf)(Buffer.from(t), o, { info: this.salt });
        const n = new Uint8Array(hkdfResult).buffer;
        const resolved = await e;
        return this.performPointwiseWithOverflow(resolved, n, (a: number, b: number) => a - b);
    }

    performPointwiseWithOverflow(
        e: ArrayBuffer, 
        t: ArrayBuffer, 
        r: (a: number, b: number) => number
    ): ArrayBuffer {
        let n: DataView, i: DataView;
        try {
            const eBuf = e instanceof ArrayBuffer ? e : e.buffer;
            const tBuf = t instanceof ArrayBuffer ? t : t.buffer;

            n = new DataView(eBuf);
            i = new DataView(tBuf);
        } catch (err) {
            console.error("DataView creation failed:", err);
            console.error("e:", e);
            console.error("t:", t);
            throw err;
        }

        const a = new ArrayBuffer(n.byteLength);
        const s = new DataView(a);

        for (let offset = 0; offset < n.byteLength; offset += 2) {
            s.setUint16(offset, r(n.getUint16(offset, true), i.getUint16(offset, true)), true);
        }

        return a;
    }
}

exports.LT_HASH_ANTI_TAMPERING = new d("WhatsApp Patch Integrity");
