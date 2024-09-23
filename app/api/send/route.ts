import { EmailTemplate } from '@/components/email-template'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { arrayBuffer } from 'stream/consumers'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const formData = await request.formData()

  const username = formData.get('username') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const content = formData.get('content') as string
  const file = formData.get('file') as File

  // console.log(username, subject, email, content, file)

  // arrayBuffer()はバイナリデータを生のバイトとして表現するためのデータ構造。
  const buffer = Buffer.from(await file.arrayBuffer())
  // console.log(buffer)

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', //resend公式の設定値
      to: ['shu73aal@gmail.com'],
      subject,
      react: EmailTemplate({ username, email, content }) as React.ReactElement, //これがないとエラーになるっぽい
      attachments: [{ filename: file.name, content: buffer }],
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
