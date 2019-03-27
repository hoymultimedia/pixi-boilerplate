/**
 * Created by pandan on 27/02/17.
 */

export default class Color {

  static interpolateColor(color1, color2, value, max, alpha) {
    let a = alpha;
    if (a === undefined) {
      a = 255;
    }

    const src1 = this.getRGB(color1);
    const src2 = this.getRGB(color2);
    const r = (((src2._red - src1._red) * value) / max) + src1._red;
    const g = (((src2._green - src1._green) * value) / max) + src1._green;
    const b = (((src2._blue - src1._blue) * value) / max) + src1._blue;

    return this.getColor32(a, r, g, b);
  }

  static getRGB(color) {
    if (color > 16777215) {
      //  The color value has an alpha component
      return {
        alpha: color >>> 24,
        _red: color >> 16 & 0xFF,
        _green: color >> 8 & 0xFF,
        _blue: color & 0xFF,
        a: color >>> 24,
        r: color >> 16 & 0xFF,
        g: color >> 8 & 0xFF,
        b: color & 0xFF,
      };
    }

    return {
      alpha: 255,
      _red: color >> 16 & 0xFF,
      _green: color >> 8 & 0xFF,
      _blue: color & 0xFF,
      a: 255,
      r: color >> 16 & 0xFF,
      g: color >> 8 & 0xFF,
      b: color & 0xFF,
    };
  }

  static getColor32(a, r, g, b) {
    return a << 24 | r << 16 | g << 8 | b;
  }

  static red = { light: 0xe54d42, dark: 0xbe3a31 };

  static orange = { light: 0xe47e30, dark: 0xd15419 };

  static yellow = { light: 0xfecc2f, dark: 0xfecc2f };

  static sand = { light: 0xefddb6, dark: 0xd4c197 };

  static navyBlue = { light: 0x35495d, dark: 0x2d3e4f };

  static magenta = { light: 0x9a5cb4, dark: 0x8d48ab };

  static teal = { light: 0x3c6f80, dark: 0x376271 };

  static skyBlue = { light: 0x3a99d8, dark: 0x2f81b7 };

  static green = { light: 0x39ca74, dark: 0x30ad63 };

  static mint = { light: 0x29bb9c, dark: 0x239f85 };

  static lightGray = { light: 0xecf0f1, dark: 0xbdc3c7 };

  static gray = { light: 0x95a5a6, dark: 0x7f8c8d };

  static darkGreen = { light: 0x355e42, dark: 0x2e5037 };

  static purple = { light: 0x7461c2, dark: 0x5b4ba0 };

  static brown = { light: 0x5d4535, dark: 0x503b2d };

  static plum = { light: 0x5d355d, dark: 0x4e2c4e };

  static melon = { light: 0xed727c, dark: 0xd7555c };

  static lime = { light: 0xa6c446, dark: 0x8faf30 };

  static pink = { light: 0xf27ec2, dark: 0xd25f9d };

  static maroon = { light: 0x78302c, dark: 0x652623 };

  static coffe = { light: 0xa28672, dark: 0x8d725f };

  static powderBlue = { light: 0xb9caef, dark: 0x9aacd3 };

  static blue = { light: 0x51669f, dark: 0x3a4d7f };

  static colors = [
    Color.red,
    Color.orange,
    Color.yellow,
    Color.sand,
    Color.navyBlue,
    Color.magenta,
    Color.teal,
    Color.skyBlue,
    Color.green,
    Color.mint,
    Color.lightGray,
    Color.gray,
    Color.darkGreen,
    Color.purple,
    Color.brown,
    Color.plum,
    Color.melon,
    Color.lime,
    Color.pink,
    Color.maroon,
    Color.coffe,
    Color.powderBlue,
    Color.blue,
  ]

}
