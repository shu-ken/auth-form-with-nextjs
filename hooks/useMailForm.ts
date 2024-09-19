import { formSchema } from '@/lib/formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
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

  const onSubmit = (values: any) => {
    console.log(values)
  }
  return { form, onSubmit }
}
