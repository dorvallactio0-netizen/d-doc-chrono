export type Priority = "urgent" | "prioritaire" | "standard"
export type QueueStatus = "en_attente" | "en_consultation" | "termine"

export type PatientRecord = {
  id: string
  name: string
  age: number
  sex: "H" | "F"
  bloodType: string
  reason: string
  department: string
  lastVisit: string
  priority: Priority
  allergies: string[]
  physician: string
  vitals: {
    heartRate: number
    bloodPressure: string
    temperature: number
    oxygen: number
  }
}

export type QueueEntry = {
  id: string
  ticket: string
  name: string
  age: number
  reason: string
  room: string
  priority: Priority
  status: QueueStatus
  waitedMinutes: number
}

export type EmergencyCase = {
  id: string
  name: string
  age: number
  condition: string
  vitals: string
  location: string
  triggeredAt: string
  level: "critique" | "grave"
}

export const priorityLabels: Record<Priority, string> = {
  urgent: "Urgent",
  prioritaire: "Prioritaire",
  standard: "Standard",
}

export const patients: PatientRecord[] = [
  {
    id: "P-10428",
    name: "Amélie Rousseau",
    age: 54,
    sex: "F",
    bloodType: "A+",
    reason: "Douleur thoracique persistante",
    department: "Cardiologie",
    lastVisit: "24 juil. 2026",
    priority: "urgent",
    allergies: ["Pénicilline"],
    physician: "Dr. Lefebvre",
    vitals: { heartRate: 112, bloodPressure: "158/94", temperature: 37.8, oxygen: 94 },
  },
  {
    id: "P-10310",
    name: "Karim Benali",
    age: 38,
    sex: "H",
    bloodType: "O-",
    reason: "Fracture avant-bras droit",
    department: "Orthopédie",
    lastVisit: "23 juil. 2026",
    priority: "prioritaire",
    allergies: [],
    physician: "Dr. Moreau",
    vitals: { heartRate: 88, bloodPressure: "128/82", temperature: 37.1, oxygen: 98 },
  },
  {
    id: "P-10287",
    name: "Sophie Nguyen",
    age: 29,
    sex: "F",
    bloodType: "B+",
    reason: "Suivi grossesse — 28 SA",
    department: "Gynécologie",
    lastVisit: "22 juil. 2026",
    priority: "standard",
    allergies: ["Latex"],
    physician: "Dr. Dubois",
    vitals: { heartRate: 76, bloodPressure: "118/74", temperature: 36.9, oxygen: 99 },
  },
  {
    id: "P-10199",
    name: "Lucas Martin",
    age: 61,
    sex: "H",
    bloodType: "AB+",
    reason: "Décompensation diabétique",
    department: "Endocrinologie",
    lastVisit: "21 juil. 2026",
    priority: "urgent",
    allergies: ["Aspirine", "Iode"],
    physician: "Dr. Lefebvre",
    vitals: { heartRate: 101, bloodPressure: "142/88", temperature: 38.2, oxygen: 96 },
  },
  {
    id: "P-10154",
    name: "Fatima Zahra",
    age: 45,
    sex: "F",
    bloodType: "O+",
    reason: "Migraine chronique",
    department: "Neurologie",
    lastVisit: "20 juil. 2026",
    priority: "standard",
    allergies: [],
    physician: "Dr. Garcia",
    vitals: { heartRate: 72, bloodPressure: "120/78", temperature: 36.7, oxygen: 99 },
  },
  {
    id: "P-10098",
    name: "Thomas Petit",
    age: 8,
    sex: "H",
    bloodType: "A-",
    reason: "Crise d'asthme",
    department: "Pédiatrie",
    lastVisit: "24 juil. 2026",
    priority: "prioritaire",
    allergies: ["Arachides"],
    physician: "Dr. Roy",
    vitals: { heartRate: 118, bloodPressure: "104/68", temperature: 37.4, oxygen: 92 },
  },
]

export const queue: QueueEntry[] = [
  {
    id: "Q-01",
    ticket: "A-114",
    name: "Amélie Rousseau",
    age: 54,
    reason: "Douleur thoracique",
    room: "Box 3",
    priority: "urgent",
    status: "en_consultation",
    waitedMinutes: 4,
  },
  {
    id: "Q-02",
    ticket: "A-115",
    name: "Thomas Petit",
    age: 8,
    reason: "Crise d'asthme",
    room: "Box 1",
    priority: "prioritaire",
    status: "en_attente",
    waitedMinutes: 12,
  },
  {
    id: "Q-03",
    ticket: "A-116",
    name: "Lucas Martin",
    age: 61,
    reason: "Décompensation diabétique",
    room: "—",
    priority: "urgent",
    status: "en_attente",
    waitedMinutes: 18,
  },
  {
    id: "Q-04",
    ticket: "A-117",
    name: "Karim Benali",
    age: 38,
    reason: "Fracture avant-bras",
    room: "—",
    priority: "prioritaire",
    status: "en_attente",
    waitedMinutes: 27,
  },
  {
    id: "Q-05",
    ticket: "A-118",
    name: "Sophie Nguyen",
    age: 29,
    reason: "Suivi grossesse",
    room: "—",
    priority: "standard",
    status: "en_attente",
    waitedMinutes: 41,
  },
  {
    id: "Q-06",
    ticket: "A-112",
    name: "Fatima Zahra",
    age: 45,
    reason: "Migraine chronique",
    room: "Box 2",
    priority: "standard",
    status: "termine",
    waitedMinutes: 0,
  },
]

export const emergencyCases: EmergencyCase[] = [
  {
    id: "E-01",
    name: "Lucas Martin",
    age: 61,
    condition: "Suspicion d'infarctus — douleur thoracique irradiante",
    vitals: "FC 112 · TA 158/94 · SpO₂ 94%",
    location: "Salle de déchocage 2",
    triggeredAt: "il y a 2 min",
    level: "critique",
  },
]
