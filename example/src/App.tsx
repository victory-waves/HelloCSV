import 'hello-csv/peer/index.css';
import Header from './components/Header';
import CodeBlock from './components/CodeBlock';
import Footer from './components/Footer';
import { EXAMPLE_CODE } from './constants';
import {
  EmployeeSheetImporter,
  EmployeeImporter,
  WideImporter,
} from './components/importers';

const App = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />

      <div className="mb-16">
        <div className="content">
          <a id="introduction"></a>
          <div className="documentation-container">
            <h3 className="font-title">
              Building a CSV uploader is hard
            </h3>
            <p className="text-lg">
              HelloCSV is a javascript library that makes it easy to drop in a
              powerful, intuitive, and elegant CSV uploader that works with any
              javascript application. <b>No React required.</b>
            </p>
          </div>
        </div>

        <div className="content">
          <a id="getting-started"></a>
          <div className="documentation-container">
            <h3 className="font-title">
              Drop in an uploader into your app in seconds
            </h3>
            <p>
              
            </p>
          </div>

          <CodeBlock code={EXAMPLE_CODE} />
        </div>

        <EmployeeImporter />
        <EmployeeSheetImporter />
      </div>

      <Footer />
    </div>
  );
};

export default App;
