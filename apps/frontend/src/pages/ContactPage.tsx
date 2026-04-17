import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'

export function ContactPage() {
  return (
    <div className="min-h-screen bg-apple-bg text-apple-text-primary dark:bg-apple-dark-bg dark:text-apple-dark-text-primary">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-apple-text-secondary hover:text-apple-text-primary dark:text-apple-dark-text-secondary dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            メイン画面に戻る
          </Link>
        </div>

        <div className="bg-apple-card border border-apple-border dark:bg-apple-dark-card dark:border-apple-dark-border rounded-2xl shadow-apple-lg p-6 sm:p-8">
          <h1 className="text-2xl font-bold mb-2">お問い合わせ</h1>
          <p className="text-sm text-apple-text-secondary dark:text-apple-dark-text-secondary mb-6">
            バグ報告・機能要望・その他のご意見をお寄せください。
          </p>

          <div className="w-full overflow-hidden rounded-lg">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSei9OZtnwopsLlnxAy8V85LTHCx1AC4KHJJDj5Yh4e5nTmovg/viewform?embedded=true"
              width="100%"
              height="933"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="お問い合わせフォーム"
              className="w-full"
            >
              読み込んでいます…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
