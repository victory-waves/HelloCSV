import { ImporterRequirementsType } from '../../types';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '../../components/index';
import { useTranslations } from '../../i18';
import { useState } from 'react';

interface Props {
  importerRequirements: ImporterRequirementsType;
}

export default function RequirementsList({ importerRequirements }: Props) {
  const { t } = useTranslations();
  const [showAllOptional, setShowAllOptional] = useState(false);

  return (
    <div className="h-full w-full space-y-5 overflow-y-auto">
      {Object.entries(importerRequirements)
        .filter(([, requirements]) => requirements.length > 0)
        .map(([groupName, requirements]) => {
          const isOptional = groupName === 'optional';
          const visibleRequirements =
            isOptional && !showAllOptional
              ? requirements.slice(0, 8)
              : requirements;
          return (
            <div key={groupName} className="me-3">
              <div className="my-3 border-b border-gray-200 pb-4 text-sm font-light uppercase">
                {t(`uploader.${groupName}Columns`)}
              </div>
              <div className="mt-4">
                {visibleRequirements.map((requirement) => (
                  <div
                    key={`${requirement.sheetId}-${requirement.columnId}`}
                    className="my-3 flex justify-between"
                  >
                    <div className="text-xs">{requirement.columnLabel}</div>
                    <div className="text-xs font-light">
                      <Tooltip
                        tooltipText={t(`uploader.${groupName}ColumnsTooltip`)}
                      >
                        <InformationCircleIcon className="size-5 text-gray-500" />
                      </Tooltip>
                    </div>
                  </div>
                ))}
                {isOptional && requirements.length > 8 && (
                  <button
                    className="mt-2 text-xs text-blue-600 hover:underline focus:outline-none"
                    onClick={() => setShowAllOptional((v) => !v)}
                  >
                    {showAllOptional
                      ? t('uploader.collapseOptional') || 'Show less'
                      : t('uploader.expandOptional') || 'Show all'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
