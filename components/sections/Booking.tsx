'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import SectionLabel from '@/components/ui/SectionLabel';
import AnimatedText from '@/components/ui/AnimatedText';
import { SERVICES, CLINIC } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FormState {
  service: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes: string;
}

const EMPTY: FormState = {
  service: '',
  name: '',
  email: '',
  phone: '',
  date: '',
  time: 'Mañana',
  notes: '',
};

const STEPS = ['Servicio', 'Datos', 'Confirmar'];
const TIMES = ['Mañana', 'Tarde', 'Noche'];

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');
}

export default function Booking() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const canNext =
    (step === 0 && form.service) ||
    (step === 1 && form.name && form.email) ||
    step === 2;

  const submit = async () => {
    // Posts to Netlify Forms. Falls back gracefully if no backend is present.
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'consultation', ...form }),
      });
    } catch {
      /* no-op — still show the concierge confirmation */
    }
    setSubmitted(true);
  };

  return (
    <section id="booking" className="relative overflow-hidden bg-obsidian py-32 md:py-44">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/[0.04] blur-[140px]" />

      <div className="container-luxe relative">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <SectionLabel index="07" label="Pedí tu turno" />
            <AnimatedText
              as="h2"
              text="Reservá tu primera consulta."
              className="font-serif text-4xl font-light leading-[1.05] text-ivory md:text-6xl"
            />
            <p className="mt-8 max-w-sm text-base font-light text-platinum">
              Dejanos algunos datos y te contactamos para coordinar un horario que te quede
              cómodo. Sin compromiso.
            </p>
            <div className="mt-10 flex flex-col gap-2 text-sm text-platinum-dim">
              <span>{CLINIC.phone}</span>
              <span>{CLINIC.email}</span>
              <span>{CLINIC.hours}</span>
            </div>
          </div>

          {/* Multi-step card */}
          <div className="relative rounded-2xl border border-ink/10 bg-gradient-to-br from-graphite/60 to-onyx/60 p-8 backdrop-blur md:p-12">
            {/* Hidden static form so Netlify can detect fields at build time */}
            <form name="consultation" data-netlify="true" hidden>
              <input type="text" name="service" />
              <input type="text" name="name" />
              <input type="email" name="email" />
              <input type="text" name="phone" />
              <input type="text" name="date" />
              <input type="text" name="time" />
              <textarea name="notes" />
            </form>

            {!submitted ? (
              <>
                {/* Stepper */}
                <div className="mb-10 flex items-center gap-3">
                  {STEPS.map((label, i) => (
                    <div key={label} className="flex flex-1 items-center gap-3">
                      <span
                        className={cn(
                          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] transition-colors duration-500',
                          i <= step
                            ? 'border-champagne bg-champagne text-obsidian'
                            : 'border-ink/20 text-platinum-dim'
                        )}
                      >
                        {i < step ? <FiCheck /> : i + 1}
                      </span>
                      <span
                        className={cn(
                          'hidden text-xs uppercase tracking-wide2 sm:block',
                          i <= step ? 'text-ivory' : 'text-platinum-dim'
                        )}
                      >
                        {label}
                      </span>
                      {i < STEPS.length - 1 && (
                        <span className="ml-auto h-px flex-1 bg-ink/10" />
                      )}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {step === 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {SERVICES.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => set('service', s.title)}
                            className={cn(
                              'rounded-xl border p-4 text-left transition-all duration-300',
                              form.service === s.title
                                ? 'border-champagne bg-champagne/10'
                                : 'border-ink/10 hover:border-ink/30'
                            )}
                          >
                            <s.Icon className="mb-2 text-xl text-champagne" />
                            <span className="block text-sm text-ivory">{s.title}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 1 && (
                      <div className="flex flex-col gap-5">
                        <Field
                          label="Nombre completo"
                          value={form.name}
                          onChange={(v) => set('name', v)}
                          placeholder="Tu nombre"
                        />
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field
                            label="Email"
                            type="email"
                            value={form.email}
                            onChange={(v) => set('email', v)}
                            placeholder="tu@email.com"
                          />
                          <Field
                            label="Teléfono"
                            value={form.phone}
                            onChange={(v) => set('phone', v)}
                            placeholder="+54 ..."
                          />
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field
                            label="Fecha preferida"
                            type="date"
                            value={form.date}
                            onChange={(v) => set('date', v)}
                          />
                          <div>
                            <label className="mb-2 block text-xs uppercase tracking-wide2 text-platinum-dim">
                              Horario preferido
                            </label>
                            <div className="flex gap-2">
                              {TIMES.map((time) => (
                                <button
                                  key={time}
                                  onClick={() => set('time', time)}
                                  className={cn(
                                    'flex-1 rounded-lg border px-2 py-3 text-xs transition-colors',
                                    form.time === time
                                      ? 'border-champagne bg-champagne/10 text-ivory'
                                      : 'border-ink/10 text-platinum-dim hover:border-ink/30'
                                  )}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="flex flex-col gap-5">
                        <div className="rounded-xl border border-ink/10 bg-ink/[0.02] p-6">
                          <Summary label="Servicio" value={form.service || '—'} />
                          <Summary label="Nombre" value={form.name || '—'} />
                          <Summary label="Email" value={form.email || '—'} />
                          <Summary label="Teléfono" value={form.phone || '—'} />
                          <Summary
                            label="Cuándo"
                            value={`${form.date || 'Flexible'} · ${form.time}`}
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-xs uppercase tracking-wide2 text-platinum-dim">
                            ¿Algo que debamos saber? (opcional)
                          </label>
                          <textarea
                            value={form.notes}
                            onChange={(e) => set('notes', e.target.value)}
                            rows={3}
                            placeholder="Cuéntanos tu objetivo..."
                            className="w-full resize-none rounded-lg border border-ink/10 bg-transparent p-4 text-sm text-ivory outline-none transition-colors placeholder:text-platinum-dim/60 focus:border-champagne"
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="mt-10 flex items-center justify-between">
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className={cn(
                      'flex items-center gap-2 text-xs uppercase tracking-wide2 text-platinum-dim transition-opacity hover:text-ivory',
                      step === 0 && 'pointer-events-none opacity-0'
                    )}
                  >
                    <FiArrowLeft /> Atrás
                  </button>

                  {step < STEPS.length - 1 ? (
                    <button
                      disabled={!canNext}
                      onClick={() => canNext && setStep((s) => s + 1)}
                      className="btn-luxe disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span>Continuar</span>
                      <FiArrowRight />
                    </button>
                  ) : (
                    <button onClick={submit} className="btn-luxe">
                      <span>Solicitar Consulta</span>
                      <FiArrowRight />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[340px] flex-col items-center justify-center text-center"
              >
                <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-champagne text-2xl text-champagne">
                  <FiCheck />
                </span>
                <h3 className="font-serif text-3xl font-light text-ivory">
                  ¡Recibimos tu solicitud!
                </h3>
                <p className="mt-4 max-w-sm text-sm font-light text-platinum">
                  Gracias, {form.name || 'y bienvenido/a'}. Te contactamos dentro de las
                  próximas 24 horas para coordinar tu turno.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wide2 text-platinum-dim">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-ink/10 bg-transparent p-4 text-sm text-ivory outline-none transition-colors placeholder:text-platinum-dim/60 focus:border-champagne"
      />
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-ink/5 py-2.5 last:border-0">
      <span className="text-xs uppercase tracking-wide2 text-platinum-dim">{label}</span>
      <span className="text-sm text-ivory">{value}</span>
    </div>
  );
}
