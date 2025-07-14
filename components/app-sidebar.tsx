"use client"
import { useRouter, usePathname } from "next/navigation"
import { Home, Calendar, Music, Radio, Heart, BookOpen, Globe, LogOut, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Users,
  },
  {
    title: "Home Update",
    url: "/dashboard/home-update",
    icon: Home,
  },
  {
    title: "Event Update",
    url: "/dashboard/event-update",
    icon: Calendar,
  },
  {
    title: "Music Update",
    url: "/dashboard/music-update",
    icon: Music,
  },
  {
    title: "Broadcast Update",
    url: "/dashboard/broadcast-update",
    icon: Radio,
  },
  {
    title: "Prayer Update",
    url: "/dashboard/prayer-update",
    icon: Heart,
  },
  {
    title: "Prayer Resources",
    url: "/dashboard/prayer-resources",
    icon: BookOpen,
  },
  {
    title: "G20 Update",
    url: "/dashboard/g20-update",
    icon: Globe,
  },
]

export function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/login")
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Heart className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Ark of Light</span>
            <span className="text-xs">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="py-2">
          <SidebarGroupLabel className="mb-2">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton asChild isActive={pathname === item.url} className="h-10">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
