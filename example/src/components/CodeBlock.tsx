import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';

export default function CodeBlock({
  code,
}: {
  code: string;
}) {
  hljs.registerLanguage('javascript', javascript);

  return (
    <>
      <pre className="max-h-[600px] mt-6 overflow-auto rounded-lg bg-slate-800 p-4 lg:p-8 text-xs lg:text-md text-white">
        <code
          className="language-javascript"
          dangerouslySetInnerHTML={{
            __html: hljs.highlight(code, { language: 'jsx' }).value,
          }}
        />
      </pre>
    </>
  );
}
