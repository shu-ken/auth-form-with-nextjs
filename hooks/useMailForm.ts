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
    },
  })

  // 関数のメモ化する。関数の再生成を抑制する。
  const onSubmit = useCallback((values: any) => {
    console.log(values)
  }, [])
  return { form, onSubmit }
}
