import {
  NavigationMenu,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { MegaMenu } from "./MegaMenu";

export const DesktopNav = () => (
  <NavigationMenu className="hidden lg:flex">
    <NavigationMenuList>
      <MegaMenu />
    </NavigationMenuList>
  </NavigationMenu>
);

export default DesktopNav;
