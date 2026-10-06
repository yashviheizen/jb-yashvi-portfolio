import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Meta { label: string; value: ReactNode }

interface Props {
  name: string
  type: string
  intro: ReactNode
  meta: Meta[]
  actions?: ReactNode
  dark?: boolean
}

export default function ProjectHeader({ name, type, intro, meta, actions, dark }: Props) {
  return (
    <header className={`phead ${dark ? 'phead--dark' : ''}`}>
      <div className="wrap">
        <Link to="/#work" className="back">
          <span aria-hidden="true">←</span> All work
        </Link>
        <p className="phead__type">{type}</p>
        <h1 className="phead__title">{name}</h1>
        <div className="phead__grid">
          <div className="phead__intro">{intro}</div>
          <dl className="phead__meta">
            {meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {actions && <div className="phead__actions">{actions}</div>}
      </div>
    </header>
  )
}
