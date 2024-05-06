"use client";
import React, { useState, useEffect } from 'react';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from '@/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";
import { ProfileData } from '@/app/interfaces'
import Cookies from 'js-cookie';

const Page = () => {
    const savedProfileData = Cookies.get('profileData');
    const initialProfileData: { profile: ProfileData } = savedProfileData ? JSON.parse(savedProfileData) : { profile: { fullName: "", email: "", phoneNumber: "", location: "", link: "" } };
    const [profileData, setProfileData] = useState<{ profile: ProfileData }>(initialProfileData);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        location: '',
        link: ''
    });

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            fullName: profileData.profile?.fullName || "",
            email: profileData.profile?.email || "",
            phoneNumber: profileData.profile?.phoneNumber || "",
            location: profileData.profile?.location || "",
            link: profileData.profile?.link || ""
        }

    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const subscription = form.watch((values) => {
                const updatedProfileData = { profile: { ...profileData.profile, ...values } };
                setProfileData(updatedProfileData);
                Cookies.set('profileData', JSON.stringify(updatedProfileData));
            });
            return () => subscription.unsubscribe();
        }
    }, [form, profileData]);

    const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
        console.log(values);
    }

    return (
        <main className="bg-black text-white w-full p-4 overflow-auto md:w-1/3 border border-gray-800">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                >
                    <h2 className="text-xl font-bold text-white">YOUR PERSONAL INFO</h2>
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="section-heading">Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="John Smith"
                                        {...field}
                                    />
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
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="johnsmith@gmail.com"
                                        type='email'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="(555) 123-4567"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Location</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Jaipur, Raj"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="link"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Link</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="mycoolportfolio.com/myname"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex space-x-2">


                    </div>
                </form>
            </Form>
        </main>
    )
}

export default Page;