import { jsPDF } from "jspdf"
import type { EmergencyCase } from "@/lib/data"

type ProtocolItem = { step: string; done: boolean }

export function exportEmergencyPdf(active: EmergencyCase, protocol: ProtocolItem[]) {
  const doc = new jsPDF({ unit: "pt", format: "a4" })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 48
  let y = margin

  // En-tête
  doc.setFillColor(200, 40, 40)
  doc.rect(0, 0, pageWidth, 70, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(18)
  doc.text("D.Doc.Chrono — Rapport d'urgence", margin, 34)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text("CODE ROUGE ACTIF", margin, 52)
  const stamp = new Date().toLocaleString("fr-FR")
  doc.text(`Édité le ${stamp}`, pageWidth - margin, 52, { align: "right" })

  y = 100
  doc.setTextColor(20, 20, 20)

  // Identité patient
  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.text(`${active.name}, ${active.age} ans`, margin, y)
  y += 18
  doc.setFont("helvetica", "normal")
  doc.setFontSize(11)
  doc.setTextColor(90, 90, 90)
  doc.text(`Niveau : ${active.level.toUpperCase()}  ·  Déclenché ${active.triggeredAt}`, margin, y)
  y += 28

  const rows: [string, string][] = [
    ["État clinique", active.condition],
    ["Constantes", active.vitals],
    ["Localisation", active.location],
  ]

  doc.setDrawColor(220, 220, 220)
  rows.forEach(([label, value]) => {
    doc.setTextColor(120, 120, 120)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(9)
    doc.text(label.toUpperCase(), margin, y)
    doc.setTextColor(20, 20, 20)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    const lines = doc.splitTextToSize(value, pageWidth - margin * 2)
    doc.text(lines, margin, y + 15)
    y += 15 + lines.length * 14 + 12
    doc.line(margin, y - 8, pageWidth - margin, y - 8)
  })

  // Protocole
  y += 10
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.setTextColor(20, 20, 20)
  doc.text("Protocole d'urgence", margin, y)
  y += 20

  doc.setFontSize(11)
  protocol.forEach((item) => {
    const box = item.done ? "[x]" : "[ ]"
    doc.setFont("helvetica", item.done ? "normal" : "bold")
    doc.setTextColor(item.done ? 120 : 20, item.done ? 120 : 20, item.done ? 120 : 20)
    doc.text(`${box}  ${item.step}`, margin, y)
    y += 20
  })

  // Pied de page
  doc.setDrawColor(220, 220, 220)
  doc.line(margin, 792, pageWidth - margin, 792)
  doc.setFont("helvetica", "italic")
  doc.setFontSize(8)
  doc.setTextColor(140, 140, 140)
  doc.text(
    "Document généré automatiquement par D.Doc.Chrono — usage médical interne confidentiel.",
    margin,
    806,
  )

  const safeName = active.name.replace(/\s+/g, "_")
  doc.save(`rapport-urgence-${safeName}.pdf`)
}
