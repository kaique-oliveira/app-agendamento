type Props = {
  color?: string | null;
};

export const ItemsIcon = ({ color = '#292D32' }: Props) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.33337 6.66659H4.66671C6.00004 6.66659 6.66671 5.99992 6.66671 4.66659V3.33325C6.66671 1.99992 6.00004 1.33325 4.66671 1.33325H3.33337C2.00004 1.33325 1.33337 1.99992 1.33337 3.33325V4.66659C1.33337 5.99992 2.00004 6.66659 3.33337 6.66659Z"
      stroke={color ?? '#292D32'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.3334 6.66659H12.6667C14 6.66659 14.6667 5.99992 14.6667 4.66659V3.33325C14.6667 1.99992 14 1.33325 12.6667 1.33325H11.3334C10 1.33325 9.33337 1.99992 9.33337 3.33325V4.66659C9.33337 5.99992 10 6.66659 11.3334 6.66659Z"
      stroke={color ?? '#292D32'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.3334 14.6666H12.6667C14 14.6666 14.6667 13.9999 14.6667 12.6666V11.3333C14.6667 9.99992 14 9.33325 12.6667 9.33325H11.3334C10 9.33325 9.33337 9.99992 9.33337 11.3333V12.6666C9.33337 13.9999 10 14.6666 11.3334 14.6666Z"
      stroke={color ?? '#292D32'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.33337 14.6666H4.66671C6.00004 14.6666 6.66671 13.9999 6.66671 12.6666V11.3333C6.66671 9.99992 6.00004 9.33325 4.66671 9.33325H3.33337C2.00004 9.33325 1.33337 9.99992 1.33337 11.3333V12.6666C1.33337 13.9999 2.00004 14.6666 3.33337 14.6666Z"
      stroke={color ?? '#292D32'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
