import { ChildrenProps } from '../utils/interface';

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
