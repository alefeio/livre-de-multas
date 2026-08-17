import { GetStaticProps } from "next";
import ServiceLanding from "components/landings/ServiceLanding";
import { getMenuData } from "lib/menu";
import { LANDING_DETRAN } from "lib/landingPages";
import { MenuData } from "../types/index";

interface PageProps {
  menu: MenuData | null;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const menu = await getMenuData();
  return {
    props: { menu: JSON.parse(JSON.stringify(menu)) },
    revalidate: 300,
  };
};

export default function RecursoMultaDetranPa({ menu }: PageProps) {
  return <ServiceLanding menu={menu} content={LANDING_DETRAN} />;
}
