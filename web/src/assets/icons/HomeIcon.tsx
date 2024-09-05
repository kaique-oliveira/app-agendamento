type Props = {
  color?: string | null;
};

export const HomeIcon = ({ color = '#292D32' }: Props) => (
  <svg
    width={17}
    height={16}
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.79206 1.89336L3.19873 4.69336C2.59873 5.16003 2.11206 6.15336 2.11206 6.90669V11.8467C2.11206 13.3934 3.37206 14.66 4.91873 14.66H12.6387C14.1854 14.66 15.4454 13.3934 15.4454 11.8534V7.00003C15.4454 6.19336 14.9054 5.16003 14.2454 4.70003L10.1254 1.81336C9.19206 1.16003 7.69206 1.19336 6.79206 1.89336Z"
      stroke={color ?? '#292D32'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.77869 11.9934V9.99341"
      stroke="none"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
