import { formSchema } from '@/lib/formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { json } from 'stream/consumers'

export const useMailForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      subject: '',
      email: '',
      content: '',
    },
  })

  // 関数のメモ化する。関数の再生成を抑制する。
  const onSubmit = useCallback(async (values: any) => {
    const { username, subject, email, content } = values

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, subject, email, content }),
      })
    } catch (err) {
      console.log(err)
    }
  }, [])
  return { form, onSubmit }
}
