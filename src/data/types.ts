export type Lang = 'ar' | 'en'

export type Bi = Record<Lang, string>
export type BiList = Record<Lang, string[]>

export interface Metric {
  value: string
  suffix?: string
  prefix?: string
  label: Bi
  note?: Bi
}

export interface Role {
  id: string
  org: Bi
  unit?: Bi
  title: Bi
  period: Bi
  years: string
  context: Bi
  challenge: Bi
  contribution: BiList
  impact: Metric[]
  capabilities: BiList
}

export type WorkScale = 'hero' | 'wide' | 'half'

export interface Work {
  id: string
  index: string
  scale: WorkScale
  title: Bi
  kind: Bi
  period: Bi
  summary: Bi
  problem: Bi
  approach: Bi
  role: Bi
  solution: BiList
  tools: string[]
  impact: Metric[]
  insight: Bi
  visual: 'dashboard' | 'assistant' | 'analyst' | 'documents' | 'network' | 'campaign'
}

export interface Credential {
  abbr: string
  name: Bi
  group: string
}

export interface CapabilityNode {
  id: string
  label: Bi
  layer: 'core' | 'enable' | 'outcome'
  detail: Bi
  x: number
  y: number
}
