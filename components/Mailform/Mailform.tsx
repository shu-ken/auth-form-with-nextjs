'use client'
import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'

const Mailform = () => {
  const form = useForm()

  function onSubmit(values: any) {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={() => {
          form.handleSubmit(onSubmit)
        }}
        className="container"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default Mailform
