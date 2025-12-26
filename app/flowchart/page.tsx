import Link from "next/link"
import { ArrowRight, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FlowchartPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Flowcharts</h1>
                <p className="text-xl text-muted-foreground">
                    Visual documentation of the system's core logic and decision-making processes.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Workflow className="w-5 h-5 text-primary" />
                            Buffer Logic
                        </CardTitle>
                        <CardDescription>
                            Buffer creation, modification, and deletion.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="/flowchart/buffer">
                                View Flowchart <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Workflow className="w-5 h-5 text-primary" />
                            Leave Management
                        </CardTitle>
                        <CardDescription>
                            Inspector leave request and approval flow.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="/flowchart/leave">
                                View Flowchart <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow opacity-60">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Workflow className="w-5 h-5 text-muted-foreground" />
                            Booking System
                        </CardTitle>
                        <CardDescription>
                            Inspection booking and scheduling process.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button disabled variant="outline" className="w-full">
                            Coming Soon
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
