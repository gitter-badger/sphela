// @flow
'use string';

const Rx = require('rxjs');

import { httpStatus } from './server';

import type { RxObservable, RxObserve } from '../shared/interfaces/rx';
import type { RouteState } from '../shared/interfaces/route';
import type { Server, ExpressRx } from '../shared/interfaces/server';
import type { File } from '../shared/interfaces/file';
import type { Vue } from '../shared/interfaces/vue';

export const APP_TEMPLATE_VAR_PATTERN = '{{{APP}}}';

export default class Route {

  _app: Vue;
  _compiledTemplate: string;

  constructor (app: Vue) {
    this._app = app;
  }

  set compiledTemplate (template: string) {
    this._compiledTemplate = template;
  }

  get compiledTemplate (): string {
    return this._compiledTemplate;
  }

  render ({ req, res, renderer }: ExpressRx): RxObservable<RouteState> {
    return Rx.Observable.create((observe: RxObserve<RouteState>) => {
      renderer.renderToString(this._app, (error, html) => {
        if (error) {
          observe.error(error);
          return;
        }
        const template = this.compiledTemplate.replace(APP_TEMPLATE_VAR_PATTERN, html);
        observe.next({ req, res, template });
      });
    });
  }

  serve (server: Server, path: string, template: File): RxObservable<RouteState> {
    return template.get()
    .do(template => {
      this.compiledTemplate = template;
    })
    .mergeMap(() => server.get(path))
    .mergeMap((msg: ExpressRx) => this.render(msg))
    .share();
  }

  send ({ req, res, template }: RouteState) {
    res.status(httpStatus.OK).send(template);
  }
}
