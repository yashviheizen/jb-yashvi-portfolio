import DeviceMockup from '../components/DeviceMockup'
import External from '../components/External'
import Flow from '../components/Flow'
import NextProject from '../components/NextProject'
import ProjectHeader from '../components/ProjectHeader'
import useTitle from '../components/useTitle'
import { getProject } from '../data/projects'

const LINK = 'https://yashviheizen.github.io/iica-mobile-app-prototype/#/home'

export default function Iica() {
  useTitle('IICA, AI-built mobile prototype | Jb Yashvi')
  return (
    <article>
      <ProjectHeader
        name="IICA"
        type="AI-built interactive mobile prototype"
        intro={
          <>
            <p className="lede">
              IICA is a mobile app concept for creators, artists and influencers: a place to discover people, view their
              profiles, find collaborators, attend events, take classes and shop.
            </p>
            <p>
              This is an interactive prototype built fully with AI. You can tap through it in the browser; it is not a
              released app.
            </p>
          </>
        }
        meta={[
          { label: 'Format', value: 'Interactive prototype, not a released app' },
          { label: 'How it was made', value: 'Built fully with AI' },
          { label: 'Areas', value: 'Discovery, profiles, collaboration, events, classes, shopping' },
        ]}
        actions={<External href={LINK}>Explore prototype</External>}
      />

      <section className="wrap showcase" aria-label="Prototype preview">
        <DeviceMockup mockup={getProject('iica').mockup!} tone="paper" eager className="mock--hero" />
      </section>

      <section className="wrap walkthrough" aria-labelledby="walk-title">
        <h2 id="walk-title" className="section-title">Selected flows</h2>

        <Flow
          title="Discover creators"
          screens={[
            { src: '/work/iica/home.webp', alt: 'Home screen.', caption: 'Home: spotlight, quick actions and the catalogue' },
            { src: '/work/iica/catalogue.webp', alt: 'Artist catalogue with featured profiles and an A to Z index.', caption: 'Catalogue with an A–Z index' },
            { src: '/work/iica/profile.webp', alt: 'Artist profile screen.', caption: 'A creator’s profile' },
          ]}
        >
          <p>
            Home leads into the catalogue of artists, coaches, athletes and venues. Each profile shows the creator’s
            discipline, location and followers, with a direct way to request a collaboration.
          </p>
        </Flow>

        <Flow
          title="Find a collaborator"
          screens={[
            { src: '/work/iica/collaborate.webp', alt: 'Collaborate screen with a text field to describe the collaborator you need.', caption: 'Describe who you’re looking for' },
            { src: '/work/iica/matches.webp', alt: 'Swipeable match card showing a 92% match.', caption: 'Swipe through suggested matches' },
            { src: '/work/iica/match-detail.webp', alt: 'Match details explaining why two creators match.', caption: 'See why a match was suggested' },
          ]}
        >
          <p>
            A creator describes the collaborator they need in their own words, then reviews suggested matches one card at a
            time and opens the details behind each one.
          </p>
          <p className="aside-note">
            The screen labels this “AI-powered matching”. In the prototype, matching is a designed interaction with sample
            data; it does not run on a working AI backend.
          </p>
        </Flow>

        <Flow
          title="Events, classes and shopping"
          screens={[
            { src: '/work/iica/event.webp', alt: 'Event detail screen.', caption: 'Event details and tickets' },
            { src: '/work/iica/shop.webp', alt: 'Shop with a featured masterclass and product types.', caption: 'Shop: masterclasses, digital and physical' },
            { src: '/work/iica/masterclass.webp', alt: 'Masterclass detail for The Art of Indian Songwriting.', caption: 'A masterclass page' },
          ]}
        >
          <p>
            Events show the date, venue, spots left and ticket price. Classes are sold as masterclasses in the shop, alongside digital
            and physical products from creators.
          </p>
        </Flow>

        <div className="end-cta">
          <External href={LINK}>Explore prototype</External>
        </div>
      </section>

      <NextProject slug="iica" />
    </article>
  )
}
