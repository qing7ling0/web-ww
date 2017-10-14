export default class Navigation {
  constructor(history) {
    this.history = history;
  }

  push(path, state) {
    this.history.push(path, state);
  }

  replace(path, state) {
    this.history.replace(path, state);
  }

  goBack() {
    if (this.history.length > 1) {
      this.history.goBack();
    }
  }

  go(off) {
    this.history.go(off);
  }

  goForward() {
    this.history.goForward();
  }
}