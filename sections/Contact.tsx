import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { Input, Textarea } from '../components/Field'
import { Button } from '../components/Button'
import { SocialLinks } from '../components/SocialLinks'
import { profile, contactConfig } from '../utils/data'
import { ArrowRight, Check, Mail, MapPin, Phone, Spinner } from '../components/Icons'

type Form = { name: string; email: string; message: string }
type Errors = Partial<Record<keyof Form, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form: Form): Errors {
  const errors: Errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name'
  if (!form.email.trim()) errors.email = 'Please enter your email'
  else if (!EMAIL_RE.test(form.email)) errors.email = 'That email looks invalid'
  if (!form.message.trim()) errors.message = 'Tell me a little about your project'
  else if (form.message.trim().length < 10) errors.message = 'A few more words, please'
  return errors
}

export function Contact() {
  const [form, setForm] = useState<Form>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const update = (key: keyof Form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return

    setStatus('submitting')

    try {
      // Send the submission to Web3Forms, which emails it straight to my inbox.
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contactConfig.web3formsAccessKey,
          subject: contactConfig.subject,
          from_name: form.name,
          name: form.name,
          email: form.email,
          message: form.message,
          // Honeypot field — bots fill it, humans never see it.
          botcheck: '',
        }),
      })

      const data = (await res.json()) as { success?: boolean }
      if (!res.ok || !data.success) throw new Error('Submission failed')

      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title={
        <>
          Let&apos;s build something <span className="text-gradient">extraordinary</span>
        </>
      }
      subtitle="Have a project in mind or just want to say hi? My inbox is always open."
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Info column */}
        <Reveal className="flex flex-col justify-between gap-8">
          <div className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-4 rounded-2xl glass p-5 transition-colors hover:border-[var(--color-violet)]/40"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--color-violet)]/15 text-[var(--color-cyan)]">
                <Mail width={20} height={20} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-current/45">
                  Email
                </span>
                <span className="font-medium group-hover:text-gradient">{profile.email}</span>
              </span>
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="group flex items-center gap-4 rounded-2xl glass p-5 transition-colors hover:border-[var(--color-violet)]/40"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--color-cyan)]/15 text-[var(--color-cyan)]">
                <Phone width={20} height={20} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-current/45">
                  Phone
                </span>
                <span className="font-medium group-hover:text-gradient">{profile.phone}</span>
              </span>
            </a>
            <div className="flex items-center gap-4 rounded-2xl glass p-5">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--color-magenta)]/15 text-[var(--color-magenta)]">
                <MapPin width={20} height={20} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-current/45">
                  Location
                </span>
                <span className="font-medium">{profile.location}</span>
              </span>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm text-current/55">Find me online</p>
            <SocialLinks />
          </div>
        </Reveal>

        {/* Form column */}
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass-strong gradient-border relative overflow-hidden rounded-3xl p-6 sm:p-8"
          >
            <div className="grid gap-6">
              <Input
                label="Your name"
                name="name"
                value={form.name}
                onChange={update('name')}
                error={errors.name}
                required
              />
              <Input
                label="Email address"
                name="email"
                type="email"
                value={form.email}
                onChange={update('email')}
                error={errors.email}
                required
              />
              <Textarea
                label="Your message"
                name="message"
                value={form.message}
                onChange={update('message')}
                error={errors.message}
                rows={5}
                required
              />

              <Button
                type="submit"
                variant="primary"
                disabled={status === 'submitting'}
                className="w-full"
                icon={
                  status === 'submitting' ? (
                    <Spinner width={18} height={18} className="animate-spin" />
                  ) : (
                    <ArrowRight width={18} height={18} />
                  )
                }
              >
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </Button>

              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="-mt-2 text-sm text-[var(--color-magenta)]"
                >
                  Something went wrong sending your message. Please try again or email me at{' '}
                  <a href={`mailto:${profile.email}`} className="underline hover:text-current">
                    {profile.email}
                  </a>
                  .
                </motion.p>
              )}
            </div>

            {/* Success overlay */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 grid place-items-center rounded-3xl bg-[rgb(var(--bg))]/85 backdrop-blur-md"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="flex flex-col items-center gap-4 text-center"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-[var(--color-aqua)]/15 text-[var(--color-aqua)] shadow-[0_0_30px_-4px_var(--color-aqua)]">
                      <Check width={28} height={28} />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold">Message sent!</h3>
                      <p className="mt-1 text-sm text-current/60">
                        Thanks for reaching out — I&apos;ll reply shortly.
                      </p>
                    </div>
                    <Button variant="ghost" onClick={() => setStatus('idle')}>
                      Send another
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
