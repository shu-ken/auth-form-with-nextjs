import { formSchema } from '@/lib/formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

export const useMailForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      subject: '',
      email: '',
      content: '',
      file: undefined,
    },
  })

  // 関数のメモ化する。関数の再生成を抑制する。
  const onSubmit = useCallback(async (values: any) => {
    const { username, subject, email, content, file } = values
    console.log(username, subject, email, content, file)

    const formData = new FormData()
    formData.append('username', username)
    formData.append('subject', subject)
    formData.append('email', email)
    formData.append('content', content)
    formData.append('file', file[0])

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send`, {
        method: 'POST',
        body: formData,
      })
    } catch (err) {
      console.log(err)
    }
  }, [])
  return { form, onSubmit }
}
