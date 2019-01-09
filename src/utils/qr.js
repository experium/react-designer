export const convertStr = str => {
    let out = '';
    for (let i = 0; i < str.length; i++) {
        let charcode = str.charCodeAt(i);
        if (charcode < 0x0080) {
            out += String.fromCharCode(charcode);
        } else if (charcode < 0x0800) {
            out += String.fromCharCode(0xc0 | (charcode >> 6));
            out += String.fromCharCode(0x80 | (charcode & 0x3f));
        } else if (charcode < 0xd800 || charcode >= 0xe000) {
            out += String.fromCharCode(0xe0 | (charcode >> 12));
            out += String.fromCharCode(0x80 | ((charcode >> 6) & 0x3f));
            out += String.fromCharCode(0x80 | (charcode & 0x3f));
        } else {
            i++;
            charcode =
            0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
            out += String.fromCharCode(0xf0 | (charcode >> 18));
            out += String.fromCharCode(0x80 | ((charcode >> 12) & 0x3f));
            out += String.fromCharCode(0x80 | ((charcode >> 6) & 0x3f));
            out += String.fromCharCode(0x80 | (charcode & 0x3f));
        }
    }
    return out;
}
