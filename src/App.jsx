import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { MainMenu } from './pages/MainMenu'
import { UserSet } from './pages/UserSet'
import { InventoryMenu } from './pages/InventoryMenu'
import { QuestMenu } from './pages/QuestMenu'
import { RaitMenu } from './pages/RaitMenu'
import { SettingMenu } from './pages/SettingMenu'
import { ShopMenu } from './pages/ShopMenu'
import { RewardsMenu } from './pages/RewardMenu'
import { QuestSeason } from './pages/QuestSeoson'
import { GameMenu } from './pages/GameMenu'
import { TournamentMenu } from './pages/TournamentMenu'
import { AchievementMenu } from './pages/AchievementMenu'
import { SellMenu } from './pages/SellMenu'
import { GameUi } from './GamePlay/GamePages/GameUI'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/shop" element={<ShopMenu />} />
        <Route path="/setting" element={<SettingMenu />} />
        <Route path="/rait" element={<RaitMenu />} />
        <Route path="/quickquest" element={<QuestMenu />} />
        <Route path="/inventory" element={<InventoryMenu />} />
        <Route path="/userset" element={<UserSet />} />
        <Route path="/questseason" element={<QuestSeason />} />
        <Route path="/gamemenu" element={<GameMenu />} />
        <Route path="/reward" element={<RewardsMenu />} />
        <Route path="/tourn" element={<TournamentMenu />} />
        <Route path="/achievement" element={<AchievementMenu />} />
        <Route path="/sellmenu" element={<SellMenu />} />
        <Route path="/game" element={<GameUi />} />

      </Routes>
    </Router>
  )
}

export default App
