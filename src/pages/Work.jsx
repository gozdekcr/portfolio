import { useState } from 'react'
import SEO from '../components/SEO'
import ScrollReveal from '../components/ScrollReveal'
import Timeline from '../components/Timeline'
import ProjectsBrowser from '../components/ProjectsBrowser'
import ProjectModal from '../components/ProjectModal'
import Container from '../components/Container'
import { experience, learning } from '../data/experience'
import { projects, filters } from '../data/projects'

export default function Work() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <SEO
        title="Work"
        description="Experience and projects — AI-powered tools, Figma plugins, and Python/Java fundamentals."
      />

      <section className="pt-40 pb-20">
        <Container>
          <ScrollReveal>
            <p className="text-xs text-muted">Experience</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              What I've been doing
            </h1>
          </ScrollReveal>

          <div className="mt-16">
            <Timeline items={experience} />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <ScrollReveal>
            <p className="text-xs text-muted">Projects</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Things I've built
            </h2>
          </ScrollReveal>

          <div className="mt-10">
            <ProjectsBrowser projects={projects} filters={filters} onOpen={setSelected} />
          </div>
        </Container>
      </section>

      <section className="pb-28">
        <Container>
          <ScrollReveal className="glass rounded-xl p-8">
            <p className="text-xs text-muted">Currently learning</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {learning.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border px-3 py-1.5 text-sm text-ink"
                >
                  {item}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
