import { renderImporter } from 'hello-csv/bundled';
import 'hello-csv/bundled/index.css';
import { CONTACT_SHEET_DEFINITION } from '../../src/constants';

const onComplete = async (data, onProgress) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  onProgress(20);
  await new Promise((resolve) => setTimeout(resolve, 200));
  onProgress(50);
  await new Promise((resolve) => setTimeout(resolve, 200));
  onProgress(100);
  console.log(data);
  setReady(true);
};

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.querySelector('#app');

  if (!appElement) {
    console.error('Could not find #app element!');
    return;
  }

  try {
    renderImporter(appElement, {
      sheets: CONTACT_SHEET_DEFINITION,
      onDataColumnsMapped: (dataColumns) => {
        console.log('Data columns mapped:', dataColumns);
        return dataColumns;
      },
      onComplete: onComplete,
      preventUploadOnValidationErrors: true,
      persistenceConfig: { enabled: true },
    });
  } catch (error) {
    console.error('Error calling renderImporter:', error);
  }
});
