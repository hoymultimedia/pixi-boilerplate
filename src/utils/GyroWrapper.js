export default class GyroWrapper {

  constructor() {
    const args = {
      frequency: 50,
      gravityNormalized: true,
      orientationBase: window.GyroNorm.GAME,
      decimalCount: 2,
      logger: null,
      screenAdjusted: false,
    };

    /**
     * GyronNorm is imported using HtmlWebpackExternalsPlugin.
     * So we fetch it from window.
     */
    this.gn = new window.GyroNorm();
    this.gn.init(args).then(() => {
      this.gn.start((data) => {
        const log = `alpha: ${data.do.alpha}\nbeta: ${data.do.beta}\ngamma: ${data.do.gamma}absolute: ${data.do.absolute}`;
        console.log(log);
      });
    }).catch((e) => {
      console.log(e);
      // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
    });
  }
}
