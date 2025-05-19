import React from 'react';
import { createRoot } from 'react-dom/client';

import Importer from './importer';
export * from './types';

import './index.css';
import { ImporterDefinition } from './types';

export default Importer;

export function renderImporter(
  element: HTMLElement,
  props: ImporterDefinition
) {
  createRoot(element).render(React.createElement(Importer, props));
}
