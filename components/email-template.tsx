import * as React from 'react'

interface EmailTemplateProps {
  username: string
  email: string
  content: string
}

// Readonlyなので読み込み専用
export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ username, email, content }) => {
  return (
    <div>
      <h1>こんにちは, {username}です。</h1>
      <p>{email}から届きました。</p>
      <p>{content}</p>
    </div>
  )
}
