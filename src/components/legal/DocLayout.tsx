import './DocLayout.css'
import MarkdownRenderer from '@/components/MarkdownRenderer'

interface Props {
  title: string
  lastUpdated: string
  content: string
}

export default function DocLayout({ title, lastUpdated, content }: Props) {
  return (
    <main className="doc-page">
      <div className="doc-container">
        <header className="doc-header">
          <h1 className="doc-title">{title}</h1>
          <p className="doc-meta">Last updated: {lastUpdated}</p>
        </header>
        <MarkdownRenderer content={content} className="doc-body" />
      </div>
    </main>
  )
}
