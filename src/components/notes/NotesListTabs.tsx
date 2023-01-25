import { Stack, Tab, Tabs } from "@mui/material"
import { useState } from "react"

export default function NotesListTabs() {
  const [selectedTab, setSelectedTab] = useState(0)

  function handleChangeTab(e: any, index: number) {
    setSelectedTab(index)
  }
  return (
    <Stack>
      <Tabs value={selectedTab} onChange={handleChangeTab}>
        <Tab label="Todos" />
        <Tab label="Favoritos" />
        <Tab label="Archivados" />
      </Tabs>
    </Stack>
  )
}
