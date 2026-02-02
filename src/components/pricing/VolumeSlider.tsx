type Props = {
  value: number
  onChange: (value: number) => void
}

export default function VolumeSlider({ value, onChange }: Props) {
  return (
    <div>
      <label
        htmlFor="volume-slider"
        className="block font-medium mb-2"
      >
        Monthly Transactions: {value.toLocaleString()}
      </label>

      <input
        id="volume-slider"
        type="range"
        min={1000}
        max={1_000_000}
        step={1000}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}
