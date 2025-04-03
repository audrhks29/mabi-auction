"use client";

import React, { useState } from "react";
import { ControllerRenderProps, useForm, UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import registerSubmit from "@/utils/register/registerSubmit";
import { registerSchema } from "@/utils/validators/register";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { registerFormArray } from "@/utils/register/form";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      user_id: "",
      user_nickname: "",
      user_server: "",
      user_race: "",
      user_password: "",
      user_password_confirm: "",
    },
  });

  const route = useRouter();
  const [isDuplicationId, setIsDuplicationId] = useState<boolean | null>(null);

  const onSubmit = (data: UserDataTypes) => registerSubmit(data, isDuplicationId, route);

  return (
    <div className="max-w-[450px] m-auto text-[12px] lg:text-[14px]">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">회원가입</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3 max-w-[450px] m-auto text-[12px] lg:text-[14px]">
              {registerFormArray(isDuplicationId, setIsDuplicationId).map(arr => (
                <FormContainer key={arr.fieldName} fieldName={arr.fieldName} form={form} labelText={arr.labelText}>
                  {arr.component}
                </FormContainer>
              ))}

              <Button type="submit" className="w-full">
                회원가입
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function FormContainer({
  fieldName,
  form,
  labelText,
  children,
}: {
  fieldName: FieldNameTypes;
  form: UseFormReturn<any>;
  labelText: string;
  children: (field: ControllerRenderProps<any, FieldNameTypes>) => React.ReactNode;
}) {
  return (
    <FormField
      name={fieldName}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-bold">{labelText}</FormLabel>
          {children(field)}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
