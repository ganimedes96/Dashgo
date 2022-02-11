import { Stack } from "@chakra-ui/react"
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri"
import { NavLink } from "./NavLink"
import { NavSection } from "./NavSection"

export  const SidebarNav = () =>(
    <Stack spacing="12" align="flex-star">

        <NavSection title="GERAL">
            <NavLink icon={RiDashboardLine} href='/dashboard'>Dashboard</NavLink>
            <NavLink icon={RiContactsLine} href='/users'>Usuarios</NavLink>
        </NavSection>

        <NavSection title="AUTOMACAO">
            <NavLink icon={RiInputMethodLine} href='/forms'>Formularios</NavLink>
            <NavLink icon={RiGitMergeLine} href='/automation'>Automacao</NavLink>

        </NavSection>




    </Stack>
)