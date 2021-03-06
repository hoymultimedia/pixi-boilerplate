import Signal from 'mini-signals';

// import robotoFnt2x from 'assets/bmpfonts/roboto@2x.fnt';
// import robotoPng2x from 'assets/bmpfonts/roboto@2x.png';
import sheet2xPng from 'assets/sheets/sheet@2x.png';
import sheet2x from 'assets/sheets/sheet@2x.json';
import circle from 'assets/images/circle.png';

export default class Resources {
  constructor(application) {
    this.onLoaded = new Signal();

    const app = application;
    app.loader.concurrency = 2;

    // app.loader.add(robotoPng2x);
    // app.loader.add(robotoFnt2x);
    app.loader.add(sheet2xPng);
    app.loader.add(sheet2x);
    app.loader.add(circle);

    app.loader.load(() => {
      this.onLoaded.dispatch();
    });
  }
}
