export function capitalize(str: string | null) {
  if (!str) return str;
  const withSpaces = str.replace(/_/g, ' ').toLowerCase();
  const capitalized = withSpaces.replace(/\b\w/g, (char) => char.toUpperCase());
  return capitalized;
}

export function truncateString(str: string, maxLength: number) {
  if (!str) return str;
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
}

export function formatPhonenumber(
  raw: string | null | undefined
): string | null {
  if (!raw) {
    return null;
  }
  // first strip number
  const p = stripPhonenumbers(raw);
  if (!p) return '';
  return /^\d{10}$/.test(p)
    ? `(${p.slice(0, 3)}) ${p.slice(3, 6)}-${p.slice(6, 10)}`
    : p;
}

export function stripPhonenumbers(
  input: string | null | undefined
): string | null {
  if (!input) {
    return null;
  }
  const result = input.replace(/\D/g, '').slice(-10);
  // // TODO: Perhaps throw error on bad formatting.
  // if (!/^\d{10}$/.test(result)) {
  //   throw new Error("Stripped phone not 10 digits")
  // }
  return result;
}

export const formatAmount = (value: number, decimals: number = 2) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
  }).format(value);
};

export function formatContactAddressPt1(contact: any) {
  if (contact.voter) {
    return [
      contact.voter.housenumber,
      contact.voter.streetname,
      contact.voter.apartmentnumber,
    ]
      .filter((x) => !!x)
      .map((x) => x?.trim())
      .join(' ');
  }
  const contactAddress = contact.address1Street;
  if (!!contactAddress) {
    return contactAddress;
  }
  return '';
}

export function formatContactAddressPt2(contact: any) {
  if (contact.voter) {
    return [contact.voter.city, contact.voter.state]
      .filter((x) => !!x)
      .map((x) => x?.trim())
      .join(', ');
  }

  const contactAddress = [contact.address1City, contact.address1State]
    .filter((x) => !!x)
    .map((x) => x?.trim())
    .join(', ');

  if (!!contactAddress) {
    return contactAddress;
  }
  return '';
}

export function formatContactAddress(contact: any) {
  if (contact.voter) {
    if (contact.voter.fulladdress) {
      return contact.voter.fulladdress;
    }
    return [
      contact.voter.streetname,
      contact.voter.housenumber,
      contact.voter.apartmentnumber,
      contact.voter.city,
      contact.voter.state,
      contact.voter.zip,
    ]
      .filter((x) => !!x)
      .map((x) => x?.trim())
      .join(', ');
  }

  const contactAddress = [
    contact.address1Street,
    contact.address1City,
    contact.address1State,
    contact.address1Zip,
  ]
    .filter((x) => !!x)
    .map((x) => x?.trim())
    .join(', ');

  if (!!contactAddress) {
    return contactAddress;
  }
  return '';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
