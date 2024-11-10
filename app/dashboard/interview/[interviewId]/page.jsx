"use client";

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import dotenv from "dotenv";

function Interview({ params }) {
    dotenv.config({ path: ".env.local" });

    const [interviewData, setInterviewData] = useState();
    const [isWebCamEnabled, setIsWebCamEnabled] = useState(true);

    useEffect(() => {
        console.log(`Interview id: ${params.interviewId}`);
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
        console.log(`Interview details: ${JSON.stringify(result)}`);
        setInterviewData(result[0]);
    };

    return (
        <div className='my-10'>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col my-5 gap-5'>
                    <div className='flex flex-col p-5 rounded-lg border'>
                        <h2 className='text-lg'><strong>Job Position/Job Role: </strong>{interviewData?.jobPosition}</h2>
                        <h2 className='text-lg'><strong>Job Position/Job Role: </strong>{interviewData?.jobPosition}</h2>
                        <h2 className='text-lg'><strong>Years of Experience: </strong>{interviewData?.jobExperience}</h2>
                    </div>

                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                        <h2 className='flex gap-2 items-center text-yellow-600'><Lightbulb /><strong>Information</strong></h2>
                        <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>

                <div>
                    {isWebCamEnabled ?
                        <Webcam
                            onUserMedia={() => setIsWebCamEnabled(true)}
                            onUserMediaError={() => setIsWebCamEnabled(false)}
                            mirrored={true}
                            className="h-72 w-full rounded-lg border"
                        /> :
                        <>
                            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                            <Button variant='ghost' className='w-full' onClick={() => setIsWebCamEnabled(true)}>Enable Web Cam & Microphone</Button>
                        </>
                    }
                </div>


            </div>

            <div className='flex justify-end items-end'>
                <Button className='my-10'>Start Interview</Button>
            </div>
        </div>
    )
};

export default Interview;