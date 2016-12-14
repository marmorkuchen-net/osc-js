import Entity from './entity'

export default class Atomic extends Entity {
  encode(type, byteLength) {
    const data = new Uint8Array(byteLength)
    const dataView = new DataView(data.buffer)

    if (!this.value) {
      throw new Error('OSC Atomic can not be encoded with empty value.')
    }

    dataView[type](this.offset, this.value, false)

    return data
  }

  decode(dataView, type, byteLength, offset) {
    this.value = dataView[type](offset, false)
    this.offset = offset + byteLength
    return this.offset
  }
}