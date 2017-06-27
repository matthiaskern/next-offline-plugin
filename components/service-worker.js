import { PureComponent } from 'react';
import NoSSR from 'react-no-ssr';
import OfflineRuntime from './offline-runtime';

export default class extends PureComponent {
  render() {
    return <NoSSR><OfflineRuntime /></NoSSR>;
  }
}
