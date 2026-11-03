import { Bot, Send, Sparkles } from 'lucide-react'
import { useRef, useState } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'
import { buildDemoReply, type ChatMessage } from '../../lib/demoAssistant'
import { createId } from '../../lib/ids'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { cn } from '../../lib/cn'

const starters = [
  'Summarize task progress',
  'What projects are at risk?',
  'Show high-priority work',
  'What is due next?',
]

export function AiAssistant() {
  const { projects, tasks } = useWorkspace()
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Demo assistant ready. I do not call a real AI model. Ask about your local tasks and projects, and I will answer from saved workspace data.',
    },
  ])
  const listRef = useRef<HTMLDivElement>(null)

  function send(prompt: string) {
    const trimmed = prompt.trim()
    if (!trimmed || pending) return

    const userMessage: ChatMessage = {
      id: createId('msg'),
      role: 'user',
      content: trimmed,
    }
    setMessages((current) => [...current, userMessage])
    setInput('')
    setPending(true)

    window.setTimeout(() => {
      const reply: ChatMessage = {
        id: createId('msg'),
        role: 'assistant',
        content: buildDemoReply(trimmed, projects, tasks),
      }
      setMessages((current) => [...current, reply])
      setPending(false)
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    }, 450)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <Card className="border-violet-400/20 bg-violet-500/10 p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 text-violet-300" size={18} />
          <div>
            <p className="font-display text-sm text-white">Demo only — no AI model is called</p>
            <p className="mt-1 text-sm leading-6 text-violet-100/80">
              Replies are generated locally from your tasks and projects. This screen is a product
              mock, not a live model integration.
            </p>
          </div>
        </div>
      </Card>

      <Card className="flex min-h-[480px] flex-col overflow-hidden">
        <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6',
                  message.role === 'user'
                    ? 'bg-violet-500 text-white'
                    : 'border border-white/8 bg-white/5 text-zinc-200',
                )}
              >
                {message.role === 'assistant' ? (
                  <span className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wide text-violet-300">
                    <Bot size={12} /> Demo assistant
                  </span>
                ) : null}
                {message.content}
              </div>
            </div>
          ))}
          {pending ? (
            <p className="text-xs text-zinc-500">Composing a local demo reply…</p>
          ) : null}
        </div>

        <div className="border-t border-white/8 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {starters.map((starter) => (
              <button
                key={starter}
                type="button"
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400 transition hover:border-violet-400/40 hover:text-white"
                onClick={() => send(starter)}
              >
                {starter}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              send(input)
            }}
          >
            <input
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-violet-400/60"
              placeholder="Ask about tasks, due dates, or projects"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" disabled={pending} icon={<Send size={16} />}>
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
