import { MapPin, Calendar, Settings2 } from 'lucide-react'

export const DestinationAndDateHeader = () => {
  return (
    <div className="h-16 px-4 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
    <div className="flex items-center gap-2">
      <MapPin className="size-4 text-zinc-400" />
      <span>Pernambuco, Brasil</span>
    </div>

    <div className="flex items-center gap-5">
      <div className="flex items-center gap-2">
        <Calendar className="size-4 text-zinc-400" />
        <span>17 a 23 e Agosto</span>
      </div>
      <div className="w-px h-6 bg-zinc-800" />
      <button className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
        Alterar local/data
        <Settings2 className="size-5" />
      </button>
    </div>
  </div>
  )
}
