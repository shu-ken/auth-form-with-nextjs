'use client'

import { Files } from 'lucide-react'
import { z } from 'zod'

export const formSchema = z.object({
  // ストリング型。２文字以上のバリデーション。エラーメッセージ付き。
  username: z.string().min(2, { message: 'ユーザー名は２文字以上で入力してください。' }),
  subject: z.string().min(2, { message: '主題は２文字以上で入力してください。' }),
  // email関数はメール用のバリデーションが用意されている。
  email: z.string().email({ message: '主題は２文字以上で入力してください。' }),
  content: z.string().min(10, { message: '本文は10文字以上で入力してください。' }).max(160, { message: '本文は160文字以内で入力してください。' }),
  // <FileList>の<>はジェネリスクというTypeScriptの書き方。ファイルの方を指定。
  // zodをカスタムで追加した場合、refine()でバリデーションを設定できる。
  // 「?」はオプショナルチェーン。ファイルがない時やNULLの場合も正常にこの関数が機能する。
  file: z.custom<FileList>().refine((files) => files?.length !== 0, 'ファイル画像が必要です。'),
})
