"use client";

import React, { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useToast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { FileInput } from "./file-input";

export default function SellNFT() {
  const { currentAccount, createSale, uploadFileToIPFS, uploadNFTToIPFS } =
    useGlobalContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const { formState } = useForm();

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const formSchema = z.object({
    name: z
      .string()
      .min(3, {
        message: "Name must be at least 3 characters.",
      })
      .max(25, { message: "Name cannot be more than 25 characters" }),
    description: z.string(),
    price: z
      .string()
      .min(1, {
        message: "Name must be at least 3 characters.",
      })
      .max(10, { message: "Name cannot be more than 25 characters" }),

    category: z
      .string({ required_error: "Please select the category" })
      .max(100, { message: "Description cannot be more than 100 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "Art",
      price: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, description, price, category } = values;
    try {
      if (!currentAccount) {
        toast({
          title: "No Wallet Connected",
          description: "Please connect your wallet first.",
        });
      }
      if (!selectedFile) {
        toast({
          title: "No File Selected",
          description: "Please select a file to upload.",
        });
        return;
      }
      if (!name || !price) {
        toast({
          title: "Incomplete Form",
          description: "Please provide both a name and a price.",
        });
        return;
      }

      const imageUrl = await uploadFileToIPFS(selectedFile);
      const dataUrl = await uploadNFTToIPFS(
        name,
        description,
        category,
        imageUrl
      );
      createSale(dataUrl, price, category);
      form.reset();
      setOpen(!open);
    } catch (error: any) {
      toast({ title: `${error}`, description: `${error.message}` });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Sell NFT</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Art with the World</DialogTitle>
          <DialogDescription>
            Let Your NFT Shine: List It for Sale
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Awesome NFT" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="This NFT is amazing..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="Art">Art</SelectItem>
                        <SelectItem value="Photography">Photography</SelectItem>
                        <SelectItem value="Gaming">Gaming</SelectItem>
                        <SelectItem value="Membership">Membership</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FileInput onFileChange={handleFileChange} />

            <Button type="submit">Sell NFT</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
