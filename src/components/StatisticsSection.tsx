"use client";

import React from "react";
import { motion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";
import { TrendingUp, Users, Shield, Zap } from "lucide-react";

interface Statistic {
    id: string;
    icon: React.ReactNode;
    label: string;
    value: number;
    suffix: string;
    prefix?: string;
    decimals?: number;
    duration?: number;
}

const statistics: Statistic[] = [
    {
        id: "transactions",
        icon: <TrendingUp size={28} className="text-primary" />,
        label: "Transactions",
        value: 10000,
        suffix: "+",
        duration: 2500,
    },
    {
        id: "users",
        icon: <Users size={28} className="text-primary" />,
        label: "Active Users",
        value: 500,
        suffix: "+",
        duration: 2000,
    },
    {
        id: "security",
        icon: <Shield size={28} className="text-primary" />,
        label: "Security Score",
        value: 99.9,
        suffix: "%",
        decimals: 1,
        duration: 2200,
    },
    {
        id: "speed",
        icon: <Zap size={28} className="text-primary" />,
        label: "Response Time",
        value: 1,
        prefix: "< ",
        suffix: "s",
        duration: 1500,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function StatisticsSection() {
    return (
        <section className="py-16 bg-[#0a0a15] text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl text-foreground font-bold transition-colors duration-300 mb-4">
                        Trusted by <span className="text-primary">Thousands</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Join the growing community of users who trust SafeTrust for secure
                        peer-to-peer transactions
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {statistics.map((stat) => (
                        <motion.div
                            key={stat.id}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 },
                            }}
                            className="relative group"
                        >
                            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10">
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className="mb-4 flex justify-center">
                                        <div className="p-3 bg-gray-800/50 rounded-xl group-hover:bg-gray-800 transition-colors duration-300">
                                            {stat.icon}
                                        </div>
                                    </div>

                                    {/* Counter */}
                                    <div className="text-4xl md:text-5xl font-bold mb-2 text-center">
                                        <Counter
                                            end={stat.value}
                                            duration={stat.duration}
                                            prefix={stat.prefix}
                                            suffix={stat.suffix}
                                            decimals={stat.decimals || 0}
                                            className="text-md md:text-2xl"
                                        />
                                    </div>

                                    {/* Label */}
                                    <p className="text-gray-400 text-sm md:text-base text-center font-medium">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-400 text-sm">
                        All metrics updated in real-time • Last updated: {new Date().toLocaleDateString()}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
