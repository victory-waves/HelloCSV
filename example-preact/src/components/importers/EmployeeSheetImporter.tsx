import { useState } from 'preact/hooks';
import Importer, {
  SheetDefinition,
  ImporterState,
} from '@victory-waves/hello-csv/react';
import Content from '../Content';
import DocumentContainer from '../DocumentContainer';
import example2 from '../../assets/datasets/example-2.csv?url';
import { CONTACT_SHEET_DEFINITION } from '@victory-waves/hello-csv';

export default function StudentsImporter() {
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

    const totalRows = data.sheetData.reduce(
      (acc: number, sheet: any) => acc + sheet.rows.length,
      0
    );

    return {
      totalRows: totalRows,
      imported: totalRows,
      failed: 0,
      skipped: 0,
    };
  };

  return (
    <Content>
      <a id="multiple-sheets"></a>
      <DocumentContainer>
        <h3 className="mb-6 text-2xl font-bold lg:text-4xl">Multiple Sheets</h3>
        <div className="container leading-8">
          <p>Sometimes, you need to upload multiple sheets at once.</p>
          <p>
            For example, imagine we want to upload both{' '}
            <code className="rounded-md bg-gray-200 p-1">employees</code> and{' '}
            <code className="rounded-md bg-gray-200 p-1">companies</code>.
          </p>
          <p>
            However, there is a{' '}
            <span className="font-semibold">many-to-one</span> relationship
            between employees and companies.
          </p>
          <p>
            In this case, HelloCSV allows you to upload a single file, and parse
            it into two different sheets.
          </p>
        </div>
        <p className="mt-8 text-lg underline decoration-blue-500 decoration-4 underline-offset-6">
          Try uploading{' '}
          <a className="text-blue-500 hover:text-blue-600" href={example2}>
            this file
          </a>
          .
        </p>
      </DocumentContainer>
      <div className="mt-4 flex h-[800px] rounded-lg border border-gray-200 bg-white px-2 py-6 sm:px-8">
        <Importer
          sheets={CONTACT_SHEET_DEFINITION}
          onDataColumnsMapped={(sheets: any) => sheets}
          onComplete={onComplete}
          persistenceConfig={{
            enabled: true,
          }}
        />
      </div>
      {ready && (
        <div>
          <h4>Check the console for the output!</h4>
        </div>
      )}
    </Content>
  );
}
