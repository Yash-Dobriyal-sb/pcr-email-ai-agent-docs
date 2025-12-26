import Image from "next/image"
import { ArrowRight, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BufferFlowchartPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Buffer Management Logic</h1>
                <p className="text-xl text-muted-foreground">
                    Visual representation of the buffer creation, modification, and deletion processes within the scheduling system.
                </p>
            </div>

            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                    These flowcharts illustrate the logic for handling inspector buffers (time blocks where inspections cannot be scheduled).
                </AlertDescription>
            </Alert>

            <Tabs defaultValue="saving" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="saving">Saving Flow</TabsTrigger>
                    <TabsTrigger value="edit">Edit Flow</TabsTrigger>
                    <TabsTrigger value="delete">Delete Flow</TabsTrigger>
                </TabsList>

                <TabsContent value="saving" className="mt-6 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Buffer Saving Process</CardTitle>
                            <CardDescription>
                                Logic flow for creating and saving new buffer entries.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center p-6 bg-white/50 dark:bg-black/20">
                            <div className="relative w-full overflow-hidden rounded-lg shadow-sm group">
                                <Image
                                    src="/flowchart/buffer_saving_flow.png"
                                    alt="Buffer Saving Flowchart"
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
                            <CardTitle>Buffer Editing Process</CardTitle>
                            <CardDescription>
                                Logic flow for modifying existing buffer entries.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center p-6 bg-white/50 dark:bg-black/20">
                            <div className="relative w-full overflow-hidden rounded-lg shadow-sm group">
                                <Image
                                    src="/flowchart/buffer_edit.png"
                                    alt="Buffer Edit Flowchart"
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
                            <CardTitle>Buffer Deletion Process</CardTitle>
                            <CardDescription>
                                Logic flow for removing buffer entries from the system.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center p-6 bg-white/50 dark:bg-black/20">
                            <div className="relative w-full max-w-2xl overflow-hidden rounded-lg shadow-sm group">
                                <Image
                                    src="/flowchart/buffer_delete.png"
                                    alt="Buffer Delete Flowchart"
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
                        <li>Check for overlap with existing inspections</li>
                        <li>Validate start/end times</li>
                        <li>Verify inspector availability</li>
                    </ul>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-primary" /> Database Updates
                    </h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Create/Update buffer record</li>
                        <li>Update inspector schedule</li>
                        <li>Log activity history</li>
                    </ul>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-primary" /> Error Handling
                    </h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Display conflict warnings</li>
                        <li>Handle network failures</li>
                        <li>Revert optimistic updates on error</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
