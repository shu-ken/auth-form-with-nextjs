'use client'
import React, { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useMailForm } from '@/hooks/useMailForm'
import { ClipLoader } from 'react-spinners'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Mailform = () => {
  const { form, onSubmit } = useMailForm()

  // useEffect = reactの機能。
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      toast.success('メールが送信されました')
    }
    // 下記の依存配列を空にするとページがロードされ、レンダリングされた時に必ず一回発火する。
    // form.formState.isSubmitSuccessfulにしたので、サクセスフルの時だけ、トーストを出現させるようになる。
  }, [form.formState.isSubmitSuccessful])

  // ダミーデータを設定する関数
  const fillDummyData = () => {
    form.setValue('username', 'ダミーユーザー')
    form.setValue('email', 'dummy@example.com')
    form.setValue('subject', 'ダミーの主題')
    form.setValue('content', 'これはダミーの本文です。')
  }

  return (
    <Form {...form}>
      <ToastContainer />
      <form onSubmit={form.handleSubmit(onSubmit)} className="container">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <Input placeholder="ユーザー名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="メールアドレス" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>主題</FormLabel>
              <FormControl>
                <Input placeholder="主題" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>本文</FormLabel>
              <FormControl>
                <Textarea placeholder="本文" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>添付画像</FormLabel>
              <FormControl>
                <Input
                  accept="image/*"
                  type="file"
                  placeholder="主題"
                  // ファイルの変更を認識する必要があるためonChange時のトリガーで、event.target.filesでファイルオブジェクトにアクセスする。
                  // REACTHOOKフォームで、状態管理がされているので、useMailFormのvaluesにこの内容が入る。
                  onChange={(event) => {
                    onChange(event.target.files)
                  }}
                  {...fieldProps}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ダミーデータ入力ボタン */}
        <Button type="button" onClick={fillDummyData} disabled={form.formState.isSubmitting}>
          ダミーデータを入力{form.formState.isSubmitting}
        </Button>
        {/* isSubmitting = 送信成功したかどうかの状態を監視できる */}
        <Button type="submit">{form.formState.isSubmitting ? <ClipLoader /> : '送信'}</Button>
      </form>
    </Form>
  )
}

export default Mailform
