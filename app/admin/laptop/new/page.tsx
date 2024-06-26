"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
    model: z.string().min(2, {
        message: "Necessário mais que dois caracteres.",
    }),
    description: z.string()
})

export default function SaveLaptop() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { //valor que aparece por padrão
            model: "Genilso",
            description: "lalala",
        },
    })

    async function onSubmit(laptop: z.infer<typeof FormSchema>) {
        const requestOptions= {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(laptop)
        }
        const response = await fetch("https://server20241-beige.vercel.app/laptops", requestOptions)
        form.reset();
        alert("Computador Cadastrado!")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Modelo:</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite o modelo do Computador" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição:</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite a Descrição" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Salvar</Button>
            </form>
        </Form>
    )
}