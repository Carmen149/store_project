import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import PersonIcon from '@mui/icons-material/Person'
import DiamondIcon from '@mui/icons-material/Diamond'
import LogoutIcon from '@mui/icons-material/Logout'

export const SidebarData =[
   {
       title:"Home",
       icon:<HomeIcon/>,
       link:"/administration",
   },
   {
    title:"Customer",
    icon:<PersonIcon/>,
    link:"/admin-customer",
   },
   {
    title:"Admin",
    icon:<AdminPanelSettingsIcon/>,
    link:"/admin",
   },
   {
    title:"Item",
    icon:<DiamondIcon/>,
    link:"/item",
   },
   {
    title:"LogOut",
    icon:<LogoutIcon/>,
    link:"/log-in",
   }
]

