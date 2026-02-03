import type { Label } from './types'

// Преобразует строку меток в массив объектов Label
export function stringToLabels(value: string): Label[] {
  return value
    .split(';')
    .map((text) => text.trim())
    .filter((text) => text.length > 0)
    .map((text) => ({ text }))
}

// Преобразует массив объектов Label в строку
export function labelsToString(labels: Label[]): string {
  return labels.map((l) => l.text).join('; ')
}
