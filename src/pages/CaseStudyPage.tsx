import CaseStudyViewer from '../components/CaseStudyViewer'
import External from '../components/External'
import NextProject from '../components/NextProject'
import ProjectHeader from '../components/ProjectHeader'
import useTitle from '../components/useTitle'

const content = {
  nutrio: {
    name: 'NUTRIO',
    type: 'End-to-end product design',
    pdf: '/case-studies/nutrio-case-study.pdf',
    pdfSize: '17 MB',
    intro: (
      <>
        <p className="lede">
          Nutrio is a healthy-food ordering and subscription product. People can order a meal now or subscribe to scheduled
          meal plans, so eating well stops depending on daily planning.
        </p>
        <p>
          I handled the user research and the end-to-end UX/UI design across four connected products: the customer app,
          the delivery partner app, the kitchen panel and the admin dashboard. AI was not used in this work.
        </p>
      </>
    ),
    meta: [
      { label: 'My role', value: 'User research, end-to-end UX/UI design' },
      { label: 'Scope', value: 'Customer app, delivery partner app, kitchen panel, admin dashboard' },
      { label: 'Year', value: '2025' },
      { label: 'AI use', value: 'None' },
    ],
    actions: <External href="https://play.google.com/store/apps/details?id=com.nutrio.customer">View on Google Play</External>,
  },
  tan90: {
    name: 'TAN90',
    type: 'Multi-portal product design',
    pdf: '/case-studies/tan90-case-study.pdf',
    pdfSize: '12 MB',
    intro: (
      <>
        <p className="lede">
          Tan90 is a cold-chain logistics platform. It connects admin, warehouse managers, delivery operations and customers
          in one system, from placing an order to approving its Proof of Delivery.
        </p>
        <p>
          I designed the platform across its four portals, covering order management, inventory, freezing stations, delivery
          coordination and POD approval.
        </p>
        <p className="aside-note">
          The product includes an AI-powered POD verification feature. That is something the product does for its users; the
          design itself is my own work, not generated with AI.
        </p>
      </>
    ),
    meta: [
      { label: 'My role', value: 'Product design' },
      { label: 'Portals', value: 'Admin, warehouse manager, delivery, customer' },
      { label: 'Key workflows', value: 'Orders, inventory, freezing stations, delivery coordination, POD approval' },
      { label: 'Year', value: '2025' },
    ],
    actions: null,
  },
} as const

export default function CaseStudyPage({ slug }: { slug: 'nutrio' | 'tan90' }) {
  const c = content[slug]
  useTitle(`${c.name}, product design case study | Jb Yashvi`)
  return (
    <article>
      <ProjectHeader name={c.name} type={c.type} intro={c.intro} meta={[...c.meta]} actions={c.actions} />
      <CaseStudyViewer id={slug} name={c.name} pdf={c.pdf} pdfSize={c.pdfSize} />
      <NextProject slug={slug} />
    </article>
  )
}
