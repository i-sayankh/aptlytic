"use client";

import React, { useState } from 'react';
import dotenv from "dotenv";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mockResponse, setMockResponse] = useState([]);
    const router = useRouter();
    const { user } = useUser();

    dotenv.config({ path: ".env.local" });

    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt = `Job Position: ${jobPosition}; Job Description: ${jobDesc}; Years of Experience: ${jobExperience}. 
        Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT} Interview Questions and answers based on the given information in JSON format.`;

        const result = await chatSession.sendMessage(InputPrompt);
        const mockJSONResponse = (result.response.text()).replace('```json', '').replace('```', '');
        // console.log(JSON.parse(mockJSONResponse));
        setMockResponse(mockJSONResponse);

        if (mockJSONResponse) {
            const response = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResponse: mockJSONResponse,
                jobPosition: jobPosition,
                jobDesc: jobDesc,
                jobExperience: jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY'),
            }).returning({ mockId: MockInterview.mockId });

            if (response) {
                setOpenDialog(false);
                router.push(`/dashboard/interview/${response[0].mockId}`);
            }
        } else {
            console.log("No response");
        }

        setIsLoading(false);
    };

    return (
        <div>
            <div
                className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>

            <Dialog open={openDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your upcoming job interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <h2>Add details about job position, Your skills and Year of experience</h2>

                                    <div className='mt-7 my-3'>
                                        <label>Job Role/Job Position</label>
                                        <Input placeholder="Example: Software Engineer" required onChange={(e) => setJobPosition(e.target.value)} />
                                    </div>

                                    <div className='my-3'>
                                        <label>Job Description/Tech Stack (In Short)</label>
                                        <Textarea placeholder="Example: React, Node.js, MongoDB" required onChange={(e) => setJobDesc(e.target.value)} />
                                    </div>

                                    <div className='mt-7 my-3'>
                                        <label>Years of Experience</label>
                                        <Input placeholder="Example: 5" type="number" max="30" min="0" required onChange={(e) => setJobExperience(e.target.value)} />
                                    </div>
                                </div>

                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={isLoading}>
                                        {
                                            isLoading ? <><LoaderCircle className='animate-spin' /> 'Generating from AI'</>
                                                : 'Start Interview'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview;