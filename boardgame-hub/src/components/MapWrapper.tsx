'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { places, players, Place, PlayerMarker } from '@/lib/mockData'
import { useAuth } from '@/contexts/AuthContext'
import { t } from '@/lib/i18n'

// Кастомные иконки для маркеров
const createClubIcon = () =>
  L.divIcon({
    className: 'custom-marker',
    html: `<div class="marker-club">🏰</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })

const createPlayerIcon = () =>
  L.divIcon({
    className: 'custom-marker',
    html: `<div class="marker-player">🎲</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })

// Компонент для центрирования карты
function MapController({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lng], map.getZoom())
  }, [lat, lng, map])
  return null
}

type FilterType = 'all' | 'clubs' | 'players'

export default function MapComponent() {
  const { lang } = useAuth()
  const [filter, setFilter] = useState<FilterType>('all')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const filteredPlaces = filter === 'players' ? [] : places
  const filteredPlayers = filter === 'clubs' ? [] : players

  if (!isMounted) {
    return (
      <div className="h-full w-full bg-amber-100/50 rounded-2xl flex items-center justify-center">
        <div className="text-amber-900 font-lora">Загрузка карты...</div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden border-4 border-amber-900 shadow-2xl">
      {/* Фильтры */}
      <div className="absolute top-4 left-4 z-[1000] flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-cinzel font-bold text-sm shadow-lg transition-all ${
            filter === 'all'
              ? 'bg-gradient-to-b from-amber-700 to-amber-900 text-amber-50'
              : 'bg-white/90 text-amber-900 hover:bg-white'
          }`}
        >
          Все
        </button>
        <button
          onClick={() => setFilter('clubs')}
          className={`px-4 py-2 rounded-lg font-cinzel font-bold text-sm shadow-lg transition-all ${
            filter === 'clubs'
              ? 'bg-gradient-to-b from-amber-700 to-amber-900 text-amber-50'
              : 'bg-white/90 text-amber-900 hover:bg-white'
          }`}
        >
          🏰 Клубы
        </button>
        <button
          onClick={() => setFilter('players')}
          className={`px-4 py-2 rounded-lg font-cinzel font-bold text-sm shadow-lg transition-all ${
            filter === 'players'
              ? 'bg-gradient-to-b from-amber-700 to-amber-900 text-amber-50'
              : 'bg-white/90 text-amber-900 hover:bg-white'
          }`}
        >
          🎲 Игроки
        </button>
      </div>

      {/* Легенда */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border-2 border-amber-900/30">
        <div className="text-xs font-cinzel font-bold text-amber-900 mb-2">Легенда</div>
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏰</span>
            <span className="text-amber-900">Клубы и антикафе</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg"></span>
            <span className="text-amber-900">Игроки ищут компанию</span>
          </div>
        </div>
      </div>

      <MapContainer
        center={[43.238949, 76.945465]}
        zoom={13}
        className="h-full w-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Маркеры клубов */}
        {filteredPlaces.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={createClubIcon()}
          >
            <Popup>
              <div className="font-lora min-w-[200px]">
                <h3 className="font-cinzel font-bold text-lg text-amber-900 mb-1">
                  {place.name}
                </h3>
                <div className="text-xs text-amber-700 mb-2">
                  ⭐ {place.rating} • {place.type === 'club' ? 'Клуб' : 'Антикафе'}
                </div>
                <div className="text-sm text-amber-950 mb-2">{place.address}</div>
                <p className="text-sm text-amber-800 mb-2 italic">{place.description}</p>
                <div className="flex flex-wrap gap-1">
                  {place.games.map((game) => (
                    <span
                      key={game}
                      className="px-2 py-0.5 bg-amber-100 border border-amber-700/30 rounded text-xs text-amber-900"
                    >
                      {game}
                    </span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Маркеры игроков */}
        {filteredPlayers.map((player) => (
          <Marker
            key={player.id}
            position={[player.lat, player.lng]}
            icon={createPlayerIcon()}
          >
            <Popup>
              <div className="font-lora min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{player.avatar || '👤'}</span>
                  <div>
                    <h3 className="font-cinzel font-bold text-lg text-amber-900">
                      {player.name}
                    </h3>
                    <div className="text-xs text-amber-700">
                      Уровень {player.level}
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-700/30 rounded p-2 mb-2">
                  <div className="text-sm font-bold text-amber-900">{player.game}</div>
                  <div className="text-xs text-amber-700">
                    Нужно игроков: {player.playersNeeded}
                  </div>
                  <div className="text-xs text-amber-700"> {player.time}</div>
                </div>
                <button className="w-full bg-gradient-to-b from-amber-700 to-amber-900 text-amber-50 py-2 rounded font-cinzel font-bold text-sm hover:from-amber-600 hover:to-amber-800 transition-all">
                  Присоединиться
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style jsx global>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .marker-club,
        .marker-player {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          background: radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(244,228,193,0.9) 100%);
          border: 2px solid #5c3a21;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4), 0 0 0 2px rgba(139, 90, 43, 0.3);
          cursor: pointer;
          transition: transform 0.2s;
        }
        .marker-club:hover,
        .marker-player:hover {
          transform: scale(1.2);
        }
        .leaflet-popup-content-wrapper {
          background: linear-gradient(to bottom, #f4e4c1, #e8d5a3);
          border: 2px solid #5c3a21;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .leaflet-popup-content {
          margin: 12px 16px;
          font-family: 'Lora', serif;
        }
        .leaflet-popup-tip {
          background: #e8d5a3;
          border: 1px solid #5c3a21;
        }
        .leaflet-container {
          font-family: 'Lora', serif;
        }
      `}</style>
    </div>
  )
}