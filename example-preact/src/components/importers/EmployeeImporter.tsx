import { useState } from 'preact/hooks';
import Importer, { ImporterState } from '@victory-waves/hello-csv/react';
import Content from '../Content';
import DocumentContainer from '../DocumentContainer';
import example1 from '../../assets/datasets/example-1.csv?url';
import { CONTACT_SHEET_DEFINITION } from '@victory-waves/hello-csv';

export default function EmployeeImporter() {
  const [ready, setReady] = useState(false);

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
    setReady(true);
  };
  return (
    <Content>
      <a id="basic-example"></a>
      <DocumentContainer>
        <h3 className="mb-6 text-2xl font-bold lg:text-4xl">Basic Example</h3>
        <div className="container leading-8">
          <p>
            Imagine we are trying to set up an uploader that uploads a CSV of{' '}
            <code className="rounded-md bg-gray-200 p-1">employees</code>.
          </p>
          <p>HelloCSV makes this a breeze.</p>
        </div>
        <p className="mt-8 text-lg underline decoration-blue-500 decoration-4 underline-offset-6">
          Try uploading{' '}
          <a className="text-blue-500 hover:text-blue-600" href={example1}>
            this file
          </a>
          .
        </p>
      </DocumentContainer>
      <div className="mt-4 flex max-h-[800px] rounded-lg border border-gray-200 bg-white px-2 py-6 sm:px-8">
        <Importer
          maxFileSizeInBytes={10 * 1024 * 1024} // 10MB
          sheets={CONTACT_SHEET_DEFINITION}
          onDataColumnsMapped={(dataColumns: any) => {
            return dataColumns;
          }}
          onComplete={onComplete}
          preventUploadOnValidationErrors
          persistenceConfig={{
            enabled: true,
          }}
        />
      </div>
      <div className="mt-4 text-sm font-semibold italic">
        Tip: You can refresh the page while using the importer, and you won't
        lose your progress!
      </div>
      {ready && (
        <div>
          <h4>Check the console for the output!</h4>
        </div>
      )}
    </Content>
  );
}
