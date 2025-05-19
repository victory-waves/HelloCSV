import Importer, { ImporterState } from 'hello-csv/react';
import 'hello-csv/react/index.css';
import { CONTACT_SHEET_DEFINITION } from '../../src/constants';
import { capitalize } from 'hello-csv/utils/string-utils';
// Define the Zod schema fields from the API

export default function App() {
  const onComplete = async (
    data: ImporterState,
    onProgress: (progress: number) => void
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    onProgress(20);
    await new Promise((resolve) => setTimeout(resolve, 200));
    onProgress(50);
    await new Promise((resolve) => setTimeout(resolve, 200));
    onProgress(100);
    console.log(data);
  };
  return (
    <Importer
      maxFileSizeInBytes={10 * 1024 * 1024} // 10MB
      sheets={CONTACT_SHEET_DEFINITION}
      onDataColumnsMapped={(dataColumns) => {
        return dataColumns;
      }}
      onComplete={onComplete}
      preventUploadOnValidationErrors
      persistenceConfig={{
        enabled: true,
      }}
    />
  );
}
