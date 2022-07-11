
import * as Icons from "react-icons/fa"
import { GiCrystalEarrings } from "react-icons/gi";
import {GiDiamondRing } from "react-icons/gi";
import { GiNecklace} from "react-icons/gi";
import {GiCharm } from "react-icons/gi";
import { GiPrimitiveNecklace } from "react-icons/gi";


export const navItems = [
    {
      id: 1,
      title: "Inele",
      path: "/ring",
      cName: "nav-item",
      icon:<GiDiamondRing/>,
    },
    {
      id: 2,
      title: "Coliere",
      path: "/necklace",
      cName: "nav-item",
      icon:<GiNecklace/>,
    },
    {
      id: 3,
      title: "Charm",
      path: "/charm",
      cName: "nav-item",
      icon:<GiCharm/>,
    },
    {
        id: 4,
        title: "Bratari",
        path: "/bracelet",
        cName: "nav-item",
        icon:<GiPrimitiveNecklace/>,
      },
      {
        id: 5,
        title: "Cercei",
        path: "/earrings",
        cName: "nav-item",
        icon:<GiCrystalEarrings/>,
      },
      {
        id: 6,
        title: "Cos",
        path: "/cart",
        cName: "nav-item",
        icon:<Icons.FaShoppingCart/>,
      },
      {
        id: 7,
        title: "WhishList",
        path: "/favList",
        cName: "nav-item",
        icon:<Icons.FaHeart/>,
      }
  ];
  
  export const serviceDropdown = [
    {
      id: 1,
      title: "Marketing",
      path: "./marketing",
      cName: "submenu-item",
    },
    {
      id: 2,
      title: "Consulting",
      path: "./consulting",
      cName: "submenu-item",
    },
    {
      id: 3,
      title: "Design",
      path: "./design",
      cName: "submenu-item",
    },
    {
      id: 4,
      title: "Development",
      path: "./development",
      cName: "submenu-item",
    },
  ];