import Signal from 'mini-signals';

import robotoFnt from 'assets/bmpfonts/roboto.fnt';
import robotoPng from 'assets/bmpfonts/roboto.png';
import robotoFnt2x from 'assets/bmpfonts/roboto@2x.fnt';
import robotoPng2x from 'assets/bmpfonts/roboto@2x.png';

export default class Resources {
  constructor(application) {
    this.onLoaded = new Signal();

    const app = application;
    app.loader.concurrency = 1;
    if (window.devicePixelRatio === 2) {
      app.loader.add(robotoPng2x);
      app.loader.add(robotoFnt2x);
    } else {
      app.loader.add(robotoPng);
      app.loader.add(robotoFnt);
    }
    app.loader.load(() => {
      this.onLoaded.dispatch();
    });
  }
}
