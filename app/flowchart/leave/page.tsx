import Image from "next/image"
import { ArrowRight, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LeaveFlowchartPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Leave Management Logic</h1>
                <p className="text-xl text-muted-foreground">
                    Visual representation of the inspector leave modification and deletion processes.
                </p>
            </div>

            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                    These flowcharts illustrate the logic for handling inspector leave requests (time off management).
                </AlertDescription>
            </Alert>

            <Tabs defaultValue="creation" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="creation">Creation Flow</TabsTrigger>
                    <TabsTrigger value="edit">Edit Flow</TabsTrigger>
                    <TabsTrigger value="delete">Delete Flow</TabsTrigger>
                </TabsList>

                <TabsContent value="creation" className="mt-6 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Leave Creation Process</CardTitle>
                            <CardDescription>
                                Logic flow for creating new leave requests.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center p-6 bg-white/50 dark:bg-black/20">
                            <div className="relative w-full overflow-hidden rounded-lg shadow-sm group">
                                <Image
                                    src="/flowchart/Leave_creation.png"
                                    alt="Leave Creation Flowchart"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                                    priority
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="edit" className="mt-6 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Leave Editing Process</CardTitle>
                            <CardDescription>
                                Logic flow for modifying existing leave requests.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center p-6 bg-white/50 dark:bg-black/20">
                            <div className="relative w-full overflow-hidden rounded-lg shadow-sm group">
                                <Image
                                    src="/flowchart/leaveEdit.png"
                                    alt="Leave Edit Flowchart"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="delete" className="mt-6 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Leave Deletion Process</CardTitle>
                            <CardDescription>
                                Logic flow for removing/cancelling leave requests.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center p-6 bg-white/50 dark:bg-black/20">
                            <div className="relative w-full max-w-2xl overflow-hidden rounded-lg shadow-sm group">
                                <Image
                                    src="/flowchart/LeaveDelete.png"
                                    alt="Leave Delete Flowchart"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-primary" /> Key Validation Steps
                    </h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Verify leave balance (if applicable)</li>
                        <li>Check for existing inspections during leave period</li>
                        <li>Validate date ranges</li>
                    </ul>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-primary" /> Database Updates
                    </h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Update inspector availability status</li>
                        <li>Record leave details</li>
                        <li>Flag conflicts for manual review</li>
                    </ul>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-primary" /> Conflict Handling
                    </h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Alert scheduler of affected bookings</li>
                        <li>Trigger rescheduling workflow if needed</li>
                        <li>Prevent double-booking</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
