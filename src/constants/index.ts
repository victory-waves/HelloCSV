import { capitalize } from '../utils/string-utils';
import { SheetColumnDefinition } from '../sheet/types';
import { ImporterOutputFieldType } from '../importer/types';

export const NUMBER_OF_EMPTY_ROWS_FOR_MANUAL_DATA_INPUT = 100;

export const NUMBER_OF_EXAMPLES_IN_MAPPING = 5;

export const SUPPORTED_FILE_MIME_TYPES = [
  'text/csv',
  'text/tab-separated-values',
];

export const DOWNLOADED_CSV_SEPARATOR = ',';

export const MAX_CHARACTERS_IN_MAPPING_EXAMPLES = 500;

export const HEALDESS_UI_PORTAL_ROOT_ID = 'headlessui-portal-root';

export const ROOT_CLASS = 'hello-csv';

export const contactFields: SheetColumnDefinition[] = [
  // Name fields
  {
    id: 'firstname',
    label: 'First Name',
    type: 'string',
    suggestedMappingKeywords: ['first name', 'first'],
    validators: [{ validate: 'required' }],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'capitalize',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return capitalize(value) ?? '';
        },
      },
    ],
  },

  {
    id: 'lastname',
    label: 'Last Name',
    type: 'string',
    suggestedMappingKeywords: ['last name', 'last'],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'capitalize',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return capitalize(value) ?? '';
        },
      },
    ],
  },

  // Phone fields
  {
    id: 'phone1Digits',
    label: 'Primary Phone',
    type: 'string',
    suggestedMappingKeywords: [
      'phone',
      'phone number',
      'phone number 1',
      'cell phone',
      'cell phone number',
      'cell phone number 1',
      'verified mobile phone',
      'home phone',
      'phone1',
      'phone 1',
      'mobile',
      'iphone',
      'home',
      'main',
    ],
    validators: [{ validate: 'required' }],
    transformers: [
      {
        transformer: 'custom',
        key: 'phone_number',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          const digits = value.replace(/\D/g, '');
          return digits.slice(-10);
        },
      },
    ],
  },
  {
    id: 'phone1Label',
    label: 'Primary Phone Type',
    type: 'string',
    suggestedMappingKeywords: ['phone type', 'phone type 1'],
    transformers: [
      {
        transformer: 'custom',
        key: 'capitalize',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return capitalize(value) ?? '';
        },
      },
      {
        transformer: 'strip',
      },
    ],
  },
  {
    id: 'phone2Digits',
    label: 'Secondary Phone',
    type: 'string',
    suggestedMappingKeywords: [
      'phone number 2',
      'phone number 2 digits',
      'landline',
      'work phone',
      'work',
    ],
    transformers: [
      {
        transformer: 'custom',
        key: 'phone_number',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          const digits = value.replace(/\D/g, '');
          return digits.slice(-10);
        },
      },
    ],
  },
  {
    id: 'phone2Label',
    label: 'Secondary Phone Type',
    type: 'string',
    suggestedMappingKeywords: ['phone type', 'phone type 2'],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'capitalize',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return capitalize(value) ?? '';
        },
      },
    ],
  },

  // Email fields
  {
    id: 'email1Email',
    label: 'Primary Email',
    type: 'string',
    suggestedMappingKeywords: [
      'email',
      'email address',
      'email address 1',
      'email_1',
    ],
    validators: [
      {
        validate: 'email',
        error: 'This email is not valid',
      },
    ],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'lower',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return value.toLowerCase();
        },
      },
    ],
  },
  {
    id: 'email1Label',
    label: 'Primary Email Type',
    type: 'string',
    suggestedMappingKeywords: ['email type', 'email type 1'],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'capitalize',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return capitalize(value) ?? '';
        },
      },
    ],
  },

  // Address fields
  {
    id: 'address1Street',
    label: 'Street Address',
    type: 'string',
    suggestedMappingKeywords: ['address', 'address 1', 'address 1 street'],
    transformers: [
      {
        transformer: 'custom',
        key: 'capitalize',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return capitalize(value) ?? '';
        },
      },
      {
        transformer: 'strip',
      },
    ],
  },
  {
    id: 'address1City',
    label: 'City',
    type: 'string',
    suggestedMappingKeywords: ['city', 'city 1', 'city 1 city'],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'capitalize',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return capitalize(value) ?? '';
        },
      },
    ],
  },
  {
    id: 'address1State',
    label: 'State',
    type: 'string',
    suggestedMappingKeywords: ['state', 'state 1', 'state 1 state'],
    transformers: [
      {
        transformer: 'state_code',
      },
    ],
  },
  {
    id: 'address1PostalCode',
    label: 'Zip Code',
    type: 'string',
    suggestedMappingKeywords: [
      'zip code',
      'zip code 1',
      'zip',
      'zip 1',
      'postal code',
      'postal code 1',
    ],
    validators: [
      {
        validate: 'postal_code',
        error: 'This is not a valid zip code',
      },
    ],
    transformers: [
      {
        transformer: 'postal_code',
      },
    ],
  },

  // Donation fields
  {
    id: 'expectedDonation',
    label: 'Expected Donation',
    type: 'number',
    suggestedMappingKeywords: [
      'expected donation',
      'likely donation',
      'amount',
    ],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'number',
        transformFn: (value: ImporterOutputFieldType): number => {
          if (typeof value !== 'string') return 0;
          const num = parseInt(value.replace(/[^\d.]/g, ''));
          return isNaN(num) ? 0 : num;
        },
      },
    ],
  },
  {
    id: 'pledgeAmount',
    label: 'Pledge Amount',
    type: 'number',
    suggestedMappingKeywords: [
      'pledge amount',
      'pledge amount 1',
      'pledge',
      'pledge amt',
    ],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'number',
        transformFn: (value: ImporterOutputFieldType): number => {
          if (typeof value !== 'string') return 0;
          const num = parseInt(value.replace(/[^\d.]/g, ''));
          return isNaN(num) ? 0 : num;
        },
      },
    ],
  },
  {
    id: 'pledgeDate',
    label: 'Pledge Date',
    type: 'string',
    suggestedMappingKeywords: ['pledge date', 'pledge date 1'],
    transformers: [
      {
        transformer: 'strip',
      },
    ],
  },
  {
    id: 'donationAmount',
    label: 'Donation Amount',
    type: 'number',
    suggestedMappingKeywords: [
      'donation amount',
      'donation amount 1',
      'donation',
      'donated amt',
    ],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'number',
        transformFn: (value: ImporterOutputFieldType): number => {
          if (typeof value !== 'string') return 0;
          const num = parseInt(value.replace(/[^\d.]/g, ''));
          return isNaN(num) ? 0 : num;
        },
      },
    ],
  },
  {
    id: 'lastDonationDate',
    label: 'Last Donation Date',
    type: 'string',
    suggestedMappingKeywords: ['last donation date', 'last donation date 1'],
    transformers: [
      {
        transformer: 'strip',
      },
    ],
  },
  {
    id: 'givingCapacity',
    label: 'Giving Capacity',
    type: 'number',
    suggestedMappingKeywords: ['giving capacity', 'giving capacity 1'],
    transformers: [
      {
        transformer: 'custom',
        key: 'number',
        transformFn: (value: ImporterOutputFieldType): number => {
          if (typeof value !== 'string') return 0;
          const num = parseInt(value.replace(/[^\d.]/g, ''));
          return isNaN(num) ? 0 : num;
        },
      },
    ],
  },
  {
    id: 'totalHistoricalGiving',
    label: 'Total Historical Giving',
    type: 'number',
    suggestedMappingKeywords: [
      'total historical giving',
      'total historical giving 1',
      'total amount of contributions',
      'total donated',
    ],
    transformers: [
      {
        transformer: 'custom',
        key: 'number',
        transformFn: (value: ImporterOutputFieldType): number => {
          if (typeof value !== 'string') return 0;
          const num = parseInt(value.replace(/[^\d.]/g, ''));
          return isNaN(num) ? 0 : num;
        },
      },
    ],
  },

  // Bio fields
  {
    id: 'company',
    label: 'Company',
    type: 'string',
    suggestedMappingKeywords: [
      'company',
      'company 1',
      'employer',
      'organization',
    ],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'capitalize',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return capitalize(value) ?? '';
        },
      },
    ],
  },
  {
    id: 'title',
    label: 'Job Title',
    type: 'string',
    suggestedMappingKeywords: [
      'job title',
      'job title 1',
      'job',
      'occupation',
      'occupation 1',
    ],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'capitalize',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return capitalize(value) ?? '';
        },
      },
    ],
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    type: 'string',
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'lower',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return value.toLowerCase();
        },
      },
    ],
  },
  {
    id: 'bio',
    label: 'Bio',
    type: 'string',
    suggestedMappingKeywords: ['bio', 'bio 1', 'bio 1 bio'],
    transformers: [
      {
        transformer: 'strip',
      },
    ],
  },
  {
    id: 'researchLink1',
    label: 'Research Link 1',
    type: 'string',
    suggestedMappingKeywords: ['research link 1', 'home page'],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'lower',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return value.toLowerCase();
        },
      },
    ],
  },
  {
    id: 'researchLink2',
    label: 'Research Link 2',
    type: 'string',
    suggestedMappingKeywords: ['research link 2'],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'lower',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return value.toLowerCase();
        },
      },
    ],
  },
  {
    id: 'researchLink3',
    label: 'Research Link 3',
    type: 'string',
    suggestedMappingKeywords: ['research link 3'],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'lower',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return value.toLowerCase();
        },
      },
    ],
  },
  {
    id: 'researchLink4',
    label: 'Research Link 4',
    type: 'string',
    suggestedMappingKeywords: ['research link 4'],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'lower',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return value.toLowerCase();
        },
      },
    ],
  },
  {
    id: 'researchLink5',
    label: 'Research Link 5',
    type: 'string',
    suggestedMappingKeywords: ['research link 5'],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'lower',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return value.toLowerCase();
        },
      },
    ],
  },
  {
    id: 'researchLink6',
    label: 'Research Link 6',
    type: 'string',
    suggestedMappingKeywords: ['research link 6'],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'lower',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return value.toLowerCase();
        },
      },
    ],
  },
  {
    id: 'researchLink7',
    label: 'Research Link 7',
    type: 'string',
    suggestedMappingKeywords: ['research link 7'],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'lower',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return value.toLowerCase();
        },
      },
    ],
  },
  {
    id: 'researchLink8',
    label: 'Research Link 8',
    type: 'string',
    suggestedMappingKeywords: ['research link 8'],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'lower',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return value.toLowerCase();
        },
      },
    ],
  },
  {
    id: 'gender',
    label: 'Gender',
    type: 'string',
    suggestedMappingKeywords: ['gender'],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'capitalize',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return capitalize(value) ?? '';
        },
      },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    type: 'string',
    suggestedMappingKeywords: ['education'],
    transformers: [
      {
        transformer: 'strip',
      },
      {
        transformer: 'custom',
        key: 'capitalize',
        transformFn: (value: ImporterOutputFieldType) => {
          if (typeof value !== 'string') return '';
          return capitalize(value) ?? '';
        },
      },
    ],
  },
];

export const CONTACT_SHEET_DEFINITION = [
  {
    id: 'contacts',
    label: 'Contacts',
    columns: contactFields,
  },
];
