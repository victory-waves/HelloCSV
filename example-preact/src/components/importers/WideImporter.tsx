import { useState } from 'preact/hooks';
import Importer, {
  SheetDefinition,
  ImporterState,
} from '@victory-waves/hello-csv/react';
import Content from '../Content';
import studentsAndSchoolsExample from '../../assets/datasets/students_and_schools.csv?url';
import { CONTACT_SHEET_DEFINITION } from '@victory-waves/hello-csv';

export default function ComplexImporter() {
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
      <h1>
        Want to see a demo? Try uploading{' '}
        <a
          className="text-blue-500 hover:text-blue-600"
          href={studentsAndSchoolsExample}
        >
          this file
        </a>
        .
      </h1>

      <div className="mt-4 flex h-[800px] rounded-lg border border-gray-200 bg-white p-6 px-8">
        <Importer
          sheets={CONTACT_SHEET_DEFINITION}
          onDataColumnsMapped={(sheets: any) => sheets}
          onComplete={onComplete}
          persistenceConfig={{
            enabled: true,
          }}
        />
        {ready && (
          <div style={{ margin: '0 auto', maxWidth: '1200px' }}>
            <h4>Check the console for the output!</h4>
          </div>
        )}
      </div>
    </Content>
  );
}
