import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function QrCode({ value, size = 160, label }: { value: string; size?: number; label?: string }) {
  const [src, setSrc] = useState('')

  useEffect(() => {
    QRCode.toDataURL(value, { width: size * 2, margin: 1, color: { dark: '#111114', light: '#ffffff' } })
      .then(setSrc)
      .catch(() => setSrc(''))
  }, [value, size])

  if (!src) return null
  return (
    <figure className="inline-flex flex-col items-center">
      <img src={src} width={size} height={size} alt={label ?? 'QR code'} className="rounded-lg bg-white p-2" />
      {label && <figcaption className="mt-2 text-xs font-semibold">{label}</figcaption>}
    </figure>
  )
}
