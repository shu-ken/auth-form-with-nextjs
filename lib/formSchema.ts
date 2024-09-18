'use client'

import { z } from 'zod'

export const formSchema = z.object({
  // ストリング型。２文字以上のバリデーション。エラーメッセージ付き。
  username: z.string().min(2, { message: 'ユーザー名は２文字以上で入力してください。' }),
  subject: z.string().min(2, { message: '主題は２文字以上で入力してください。' }),
  // email関数はメール用のバリデーションが用意されている。
  email: z.string().email({ message: '主題は２文字以上で入力してください。' }),
  content: z.string().min(10, { message: '本文は10文字以上で入力してください。' }).max(160, { message: '本文は160文字以内で入力してください。' }),
})
