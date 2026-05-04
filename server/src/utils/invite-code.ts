import {customAlphabet} from "nanoid"

export function generateInviteCode(length: number) {
    const generate = customAlphabet(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        length,
    )

    return generate()
}
