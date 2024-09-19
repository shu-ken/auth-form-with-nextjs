import { EmailTemplate } from '@/components/email-template'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function post() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', //resend公式の設定値
      to: ['0deshikanai@gmail.com'],
      subject: 'next.jsのテスト',
      react: EmailTemplate({ username: 'John', email: 'test@gmail.com', content: 'フォーム開発はこちら' }) as React.ReactElement, //これがないとエラーになるっぽい
    })
    // エラーハンドリング
    if (error) {
      return NextResponse.json({ error })
    }
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error })
  }
}
