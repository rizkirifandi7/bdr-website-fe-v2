"use client";

import React, { useState, useCallback } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { setCookie } from "@/actions/cookies";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
	email: z
		.string()
		.email("Email must be valid.")
		.trim()
		.min(1, "Email is required."),
	password: z.string().trim().min(1, "Password is required."),
});

const PageLogin = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onLogin = useCallback(
		async (data) => {
			setIsLoading(true);
			try {
				const { email, password } = data;

				if (!process.env.NEXT_PUBLIC_API_URL) {
					throw new Error("API URL is not set in the environment variables.");
				}

				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
					{ email, password },
					{ headers: { "Content-Type": "application/json" } }
				);

				const {
					role,
					data: { token },
				} = response.data;

				await setCookie("auth_session", token);
				toast.success("Login successful.");

				if (role === "admin" || role === "pegawai") {
					router.push("/dashboard-order/home");
				} else if (role === "adminhome") {
					router.push("/dashboard-home/menu");
				} else {
					toast.error("You do not have access.");
				}
			} catch (error) {
				console.error("Login error:", error);
				const errorMessage =
					error.response?.data?.message || "Invalid email or password.";
				toast.error(errorMessage);
			} finally {
				setIsLoading(false);
			}
		},
		[router]
	);

	return (
		<div className="flex justify-center items-center w-full min-h-screen bg-white">
			<Card className="w-[450px]">
				<CardHeader>
					<div className="flex flex-col justify-center items-center my-8 gap-2">
						<Image
							src="/logobdr.png"
							width={80}
							height={80}
							alt="Logo"
							priority
						/>
						<p className="text-base font-bold">Bakso Dono Reborn</p>
					</div>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email and password to log in
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onLogin)} className="space-y-6">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your email..."
												{...field}
												type="text"
												disabled={isLoading}
                        className="w-full py-6"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your password..."
												{...field}
												type="password"
												disabled={isLoading}
                        className="w-full py-6"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full py-6 rounded-lg bg-orange-500 text-white hover:bg-slate-800"
								disabled={isLoading}
							>
								{isLoading ? "Loading..." : "Login"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default PageLogin;
