import {customAlphabet} from "nanoid"

export function generateInviteCode(length: number) {
    return customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", length)
}
