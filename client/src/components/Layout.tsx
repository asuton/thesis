import NavbarRecord from "./NavbarRecord";
import NavbarHome from "./NavbarHome";
import { useLocation } from "react-router-dom";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout: React.FC<Props> = (props: Props) => {
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  return (
    <>
      {usePathname() === "/" ? (
        <NavbarHome></NavbarHome>
      ) : (
        <NavbarRecord></NavbarRecord>
      )}
      <div>{props.children}</div>
    </>
  );
};

export default Layout;
