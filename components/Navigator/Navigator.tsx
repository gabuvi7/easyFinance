import Link from 'next/link';
import { Route } from '../../app/models';

interface MenuItems {
  pathNames: Route[];
  linkCssClasses: string;
  titleCssClasses: string;
}
function Navigator({ pathNames, linkCssClasses, titleCssClasses }: Partial<MenuItems>) {
  return (
    <>
      {pathNames?.map((menuItem) => (
        <Link key={menuItem.title} className={linkCssClasses} href={menuItem.path}>
          <>
            {menuItem.icon && menuItem.icon}
            <span className={titleCssClasses}>{menuItem.title}</span>
          </>
        </Link>
      ))}
    </>
  );
}
export default Navigator;
