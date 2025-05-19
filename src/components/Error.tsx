import { ReactNode } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  children: ReactNode;
}

export default function Error({ children }: Props) {
  return (
    <div className="flex">
      <div className="shrink-0">
        <XCircleIcon
          aria-hidden="true"
          className="text-hello-csv-danger size-5"
        />
      </div>
      <div className="ml-3 flex-1 md:flex md:justify-between">
        <p className="text-hello-csv-danger text-sm">{children}</p>
      </div>
    </div>
  );
}
